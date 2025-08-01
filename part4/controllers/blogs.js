const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.get("/:id", (request, response) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
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

module.exports = blogsRouter;
