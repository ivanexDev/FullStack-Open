const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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
    const user = await User.find({});
    const userId = user[0]._id.toString();

    request.body.user = userId;

    const blog = new Blog(request.body);

    const savedBlog = await blog.save();

    user[0].blogs = user[0].blogs.concat(savedBlog._id);

    await user[0].save();

    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete("/:id", (request, response) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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
