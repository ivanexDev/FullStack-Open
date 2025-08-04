const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
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
  try {
    if (!request.body.title || !request.body.url) {
      return response.status(400).json({ error: "Bad Request" });
    }

    const blog = new Blog(request.body);

    const result = await blog.save();

    response.status(201).json(result);
  } catch (error) {
    next(error);
  }

  // .catch((error) => next(error));
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
