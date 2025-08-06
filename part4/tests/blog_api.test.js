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
  test("Create a new blog should fail if token isnt given", async () => {
    const newBlog = {
      title: "blog",
      author: "user",
      url: "https://url",
      likes: 1000,
    };

    const result = await api.post("/bloglist").send(newBlog).expect(401);

    assert.strictEqual(result.body.error, "Unauthorized");
  });

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

    const newUser = await api
      .post("/register")
      .send({ username: "test", name: "test", password: "123123" });
    const token = newUser.body.token;

    const result = await api
      .post("/bloglist")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const allBlogs = await blogsInDb();

    assert.strictEqual(allBlogs.length, 3);

    assert.strictEqual(String(allBlogs[2].user), result.body.user);
  });

  test("like should be 0 if the number is not given", async () => {
    const newUser = await api
      .post("/register")
      .send({ username: "test2", name: "test", password: "123123" });
    const token = newUser.body.token;

    const newBlog = {
      title: "no likes",
      author: "boom",
      url: "http://blog4",
    };

    const result = await api
      .post("/bloglist")
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .send(newBlog);

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
    const newUser = await api
      .post("/register")
      .send({ username: "test3", name: "test", password: "123123" });

    const token = newUser.body.token;

    const newBlog = {
      title: "Blog to delete",
      author: "Delete Me",
      url: "http://delete-me.com",
      likes: 0,
    };

    const createdBlog = await api
      .post("/bloglist")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(201);

    const blogsAfterCreate = await blogsInDb();

    await api
      .delete(`/bloglist/${createdBlog.body.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogsAtEnd = await blogsInDb();
    assert.strictEqual(blogsAtEnd.length, blogsAfterCreate.length - 1);

    const ids = blogsAtEnd.map((blog) => blog.id);
    assert.ok(!ids.includes(createdBlog.body.id));
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
