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

describe("Blogs api", () => {
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

    assert.strictEqual(allPosts.length, 3);
    assert.deepStrictEqual(result.body, allPosts[2]);
  });

  test("like should be 0 if the number is not given", async () => {
    const newBlog = {
      title: "no likes",
      author: "boom",
      url: "http://blog4",
    };

    const result = await api.post("/bloglist").expect(201).send(newBlog);

    assert.strictEqual(result.body.likes, 0);
  });

  test("new blog may contain title and url keys", async () => {
    const noTitle = {
      author: "boom",
      url: "http://blog4",
    };

    const noUrl = {
      title: "no likes",
      author: "boom",
      url: "http://blog4",
    };

    await api.post("/bloglist").send(noTitle).expect(400);
    // await api.post().send(noTitle).expect(400);
  });

  test("should delete one blog", async () => {
    const allPosts = await blogsInDb();
    const id = allPosts[0].id;

    await api.delete(`/bloglist/${id}`).expect(204);
  });

  test("should update likes of a blog", async () => {
    const newContent = {
      // author: 'Paul',
      // url: 'http://paul2',
      likes: 95,
    };

    const allPosts = await blogsInDb();
    const targetId = allPosts[0].id;

    const response = await api
      .patch(`/bloglist/${targetId}`)
      .send(newContent)
      .expect(200);

    const { likes } = response.body;

    assert.deepEqual(likes, newContent.likes);
  });

  test("update should contain likes", async () => {
    const allPosts = await blogsInDb();
    const targetId = allPosts[0].id;

    await api
      .patch(`/bloglist/${targetId}`)
      .send({ author: "anyone" })
      .expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
