const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async(request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const salts = 10;

    const passwordHash = bcrypt.hashSync(password, salts);

    const user = new User({ username, name, passwordHash });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes',{content: 1, important: 1})
  response.json(users)
})

module.exports = usersRouter;
