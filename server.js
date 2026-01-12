const express = require("express");
const logger = require("morgan");
const db = require("./db/connection.js");
const Fruit = require("./models/fruit.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

//routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

app.post("/fruits",  async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body)

  res.redirect("/fruits/new");
});

db.on("connected", () => {
  console.clear();
  console.log("You are connected to the database");

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
