const express = require("express");
// const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./db.js");
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
var bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();
var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false })

db();

app.use(cors());
app.use(jsonParser);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.json({ msg: "Welcome" });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
