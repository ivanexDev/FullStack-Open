const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if (!username || !password) {
      return response
        .status(400)
        .json({ error: "Username and password are required" });
    }

    if (username.length < 4 || password.length < 4) {
      return response.status(400).json({
        error: "Username and password must be larger than 3 characters",
      });
    }

    const salts = 10;

    const passwordHash = bcrypt.hashSync(password, salts);

    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    likes: 0,
    user: 0,
  });
  response.json(users);
});

module.exports = usersRouter;
