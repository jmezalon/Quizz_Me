const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const quizzes = require("./routes/quizzes.js");
const topics = require("./routes/topics.js");
const questions = require("./routes/questions.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/quizzes", quizzes);
app.use("/topics", topics);
app.use("/questions", questions);

app.get("/", (req, res) => {
  res.send("this is the home page");
});

app.get("*", (req, res) => {
  res.send("this page does not exist, please go back to the home page");
});

app.listen(1463, () => {
  console.log("you are listenning to port 1463");
});
