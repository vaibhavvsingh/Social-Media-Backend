const express = require("express");
const authRouter = express.Router();
const User = require("../userSchema");

//SIGNUP
authRouter.post("/signup", async (req, res) => {
  try {
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    user.save();
    res.json("New user created");
  } catch (err) {
    console.log(err);
  }
});

//LOGIN
authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");

    user.password != req.body.password &&
      res.status(400).json("wrong password");

    res.status(200).json("logged in successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = authRouter;
