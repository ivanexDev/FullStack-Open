const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
const { initialBlogs } = require("./test_helpers");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogs = initialBlogs.map((blog) => new Blog(blog));
  const promiseBlogs = blogs.map((blog) => blog.save());

  await Promise.all(promiseBlogs);
});

describe("blogs api", () => {
  test("should get correct number of blogs", async () => {
    const blogs = await api
      .get("/bloglist")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(blogs.body.length, 2);
  });

  test("response should contain id intead of _id", async () => {
    const blogs = await api.get("/bloglist");

    const blog = blogs.body[0];

    assert.strictEqual("id" in blog, true);
    assert.ok(!("_id" in blog));
  });
});

after(async () => {
  await mongoose.connection.close();
});
