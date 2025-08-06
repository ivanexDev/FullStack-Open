const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { getTokenFrom } = require("../utils/helpers");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      response.status(404).end();
    }
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post("/", async (request, response, next) => {
  if (!request.body.title || !request.body.url) {
    return response.status(400).json({ error: "Bad Request" });
  }

  try {
    if (!request.body.title || !request.body.url) {
      return response.status(400).json({ error: "Title and URL are required" });
    }

    if (!request.user) {
      return response.status(401).json({ error: "Unauthorized" });
    }
    const user = request.user;

    const blog = new Blog({
      ...request.body,
      user: user._id,
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    if (blog.user.toString() !== request.user.id) {
      return response
        .status(403)
        .json({ error: "Forbidden: Not the blog owner" });
    }

    await blog.deleteOne();

    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.patch("/:id", async (request, response, next) => {
  const newContent = request.body;
  const id = request.params.id;

  if (!Object.keys(newContent).includes("likes")) {
    return response.status(400).json({ error: "'likes' field is required" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, newContent, {
      new: true,
    });

    if (!updatedBlog) {
      response.status(404).end();
    }

    response.json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
