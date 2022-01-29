const express = require("express");
const User = require("../userSchema");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.json({ msg: "Hello from User" });
});

userRouter.put("/:username", async (req, res) => {
  if (req.body.username === req.params.username) {
    try {
      const user = await User.findOne({ username: req.params.username });

      if (user.password === req.body.password) {
        await User.findOneAndUpdate(req.params.username, {
          $set: { ...req.body },
        });
        res.status(200).json("Account has been updated");
      } else return res.status(403).json("You can update only your account");
    } catch (err) {
      // console.log(err);
      res.status(500).json("Could not update account");
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

userRouter.put("/:username/post/add", async (req, res) => {
  if (req.body.username === req.params.username) {
    try {
      let user = await User.findOne({ username: req.params.username });
      // console.log(user.posts);

      if (user.password === req.body.password) {
        user.posts.push(req.body.post);
        await User.findOneAndUpdate(
          { username: req.params.username },
          {
            ...user,
          }
        );
        res.status(200).json("Account has been updated");
      } else return res.status(403).json("You can update only your account");
    } catch (err) {
      // console.log(err);
      res.status(500).json("Could not update account");
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

userRouter.put("/:username/post/remove", async (req, res) => {
  if (req.body.username === req.params.username) {
    try {
      let user = await User.findOne({ username: req.params.username });
      // console.log(user.posts);

      if (user.password === req.body.password) {
        user.posts.pop();
        await User.findOneAndUpdate(
          { username: req.params.username },
          {
            ...user,
          }
        );
        res.status(200).json("Account has been updated");
      } else return res.status(403).json("You can update only your account");
    } catch (err) {
      // console.log(err);
      res.status(500).json("Could not update account");
    }
  } else {
    return res.status(403).json("You can update only your account");
  }
});

userRouter.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
userRouter.post("/posts", async (req, res) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user.password === req.body.password) {
      let postsRes = await User.find({}).select("posts -_id");
      let allposts = [];
      postsRes.forEach((element) => {
        element.posts.forEach((post) => {
          allposts.push(post);
        });
      });

      res.status(200).json(allposts);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = userRouter;
