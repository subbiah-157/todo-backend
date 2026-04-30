const Todo = require("../models/Todo");

// GET ALL
exports.getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

// CREATE
exports.createTodo = async (req, res) => {
  const { text } = req.body;
  const todo = await Todo.create({ text });
  res.json(todo);
};

// UPDATE
exports.updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text },
    { new: true }
  );
  res.json(todo);
};

// DELETE
exports.deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};