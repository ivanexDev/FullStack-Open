const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const Blog = require("../models/blog");
const supertest = require("supertest");
const assert = require("node:assert");
const app = require("../app");
// const { initialNotes, nonExistingId, notesInDb } = require("./test_helpers");

const api = supertest(app);

describe("blogs api", () => {
  test("should get correct number of blogs", async () => {
    const blogs = await api
      .get("/bloglist")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(blogs.body.length, 0);

  });
});

after(async () => {
  await mongoose.connection.close();
});