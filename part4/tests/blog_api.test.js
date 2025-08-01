const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const Blog = require("../models/blog");
const app = require("../app");
const { initialBlogs, blogsInDb } = require("./test_helpers");

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

  test("Should create a new blog", async () => {
    const newBlog = {
      title: "blog3",
      author: "Guthrie Govan",
      url: "http://blog3",
      likes: 999,
    };

    const result = await api.post("/bloglist").send(newBlog).expect(201);

    const allPosts = await blogsInDb();

    console.log(result.body);

    assert.strictEqual(allPosts.length, 3);
    assert.deepStrictEqual(result.body, allPosts[2]);
  });
});

after(async () => {
  await mongoose.connection.close();
});
