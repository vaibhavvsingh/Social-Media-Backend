const express = require("express");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ msg: "Hello from User" });
});

module.exports = userRouter;
