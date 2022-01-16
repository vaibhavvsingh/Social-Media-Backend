const express = require("express");
const authRouter = express.Router();
const User = require("./userRouter");

authRouter.post("/signup", async (req, res) => {
  try {
    const user = await new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    user.save();
    res.send("New user created");
  } catch (err) {
    console.log(err);
  }
});

authRouter.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ msg: "Login requested" });
});

module.exports = authRouter;
