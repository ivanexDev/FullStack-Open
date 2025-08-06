const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const registerRouter = require("express").Router();

registerRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    if(!username || !password){
      return response.status(400).json({ error: "Username and password are required" });
    }

    if(username.length < 4 || password.length < 4){
      return response.status(400).json({ error: "Username and password must be larger than 3 characters" });
    }


    const salt = 10;
    const passwordHash = bcrypt.hashSync(password, salt);

    console.log(!username || !password)



    const user = new User({
      username,
      name,
      passwordHash,
    });

    await user.save();

    const userForToken = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60,
    });

    response.status(201).json({ username: user.username, name: user.name, token });
  } catch (error) {
    next(error);
  }
});

module.exports = registerRouter;
