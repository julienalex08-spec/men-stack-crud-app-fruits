const express = require("express");
const logger = require("morgan");
const methodOverride = require("method-override");
const db = require("./db/connection.js");
const Fruit = require("./models/fruit.js");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(logger("dev"));

//routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});

app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }

  await Fruit.create(req.body);

  res.redirect("/fruits");
});

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find({});
  console.log(allFruits);
  res.render("fruits/index.ejs", {
    fruits: allFruits,
  });
});

app.get("/fruits/:fruitId", async (req, res) => {
  const fruit = await Fruit.findById(req.params.fruitId);

  res.render("fruits/show.ejs", {
    fruit: fruit,
  });
});

app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
  res.redirect("/fruits");
});

app.get("/fruits/:fruitId/edit", async (req, res) => {
  const fruitData = await Fruit.findById(req.params.fruitId);
  res.render("fruits/edit.ejs", {
    fruit: fruitData,
  });
});

app.put("/fruits/:fruitId", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);

  res.redirect(`/fruits/${req.params.fruitId}`)
});

db.on("connected", () => {
  console.clear();
  console.log("You are connected to the database");

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
});
