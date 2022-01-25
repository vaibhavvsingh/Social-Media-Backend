const express = require("express");
const User = require("../userSchema");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ msg: "Hello from User" });
});

userRouter.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: { ...req.body },
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      console.log(err);
      res.status(500).json("Could not update account");
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

module.exports = userRouter;
