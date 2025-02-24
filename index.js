const express = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/test");

const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const uuid = require("uuid");
const connectdb = require("./config/db");

app.use(bodyParser.json());

const userSchema = new mongoose.Schema({
  id: Number,
  desc: String,
  completed: String,
});

const User=mongoose.model("User", userSchema)
const todos = [
  {
    id: 1,
    desc: "write JS Code",
    completed: true,
  },
  {
    id: 2,
    desc: "write C# Code",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Todo List Home Page</h1>");
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

//To Get Todo
app.get("/todos/:id", (req, res) => {
  console.log(req.params.id);
  let todo = todos.filter((todo) => todo.id == req.params.id);
  res.json(todo);
});

//Create Todo
app.post("/todos", (req, res) => {
  let body = req.body;
  console.log(body);
  todos.push({ id: uuid.v4(), ...body });
  res.json(todos);
});

//Edit Todo
app.put("/todos/:id", (req, res) => {
  let todo = todos.find((todo) => todo.id == req.params.id);
  if (todo) {
    todo.desc = req.body.desc;
    todo.completed = req.body.completed;
    res.json(todos);
  } else {
    console.log("Todo with given ID is not Present...");
  }
});

//Delete Todo
app.delete("/todos/:id", (req, res) => {
  let index = todos.findIndex((todo) => todo.id == req.params.id);
  console.log(index);
  todos.splice(index, 1);
  res.json(todos);
  if (!id) {
    console.log("ID is not Present");
  }
});

app.listen(port, () => {
  console.log("Listening to Port : 8080");
});
