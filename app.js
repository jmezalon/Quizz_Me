const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const churches = require("./routes/churches.js");
// const members = require("./routes/members.js");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/churches", churches);
// app.use("/members", members);

app.get("/", (req, res) => {
  res.send("this is the home page");
});

app.get("*", (req, res) => {
  res.send("this page does not exist, please go back to the home page");
});

app.listen(1463, () => {
  console.log("you are listenning to port 1250");
});
