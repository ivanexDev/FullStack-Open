const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("node:assert");
const { test, describe, after } = require("node:test");

const api = supertest(app);

describe("Register and login", () => {
  test("Should return error if password or username arent given", async () => {
    const newUser = {
      name: "new_user",
    };

    const result = await api
      .post("/register")
      .send()
      .expect(400)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(result.body.error, "Username and password are required");
  });

  test("Should throw error if username or password is shorter than 3 characters", async () => {
    const newUser = {
      username: "a",
      name: "user",
      password: "b",
    };

    const result = await api.post("/register").send(newUser).expect(400);

    assert.strictEqual(
      result.body.error,
      "Username and password must be larger than 3 characters",
    );
  });
});

after(async () => {
  await mongoose.connection.close();
});
