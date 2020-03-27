const express = require("express");
const router = express.Router();
const Tasks = require("../models/task");

// route for creating task
router.post("/", async (req, res) => {
  const task = new Tasks({
    name: req.body.name,
    DueDate: req.body.DueDate,
    CompletionDate: req.body.CompletionDate,
    Status: req.body.Status
  });

  try {
    const newTask = await task.save();
    res.status(201).json({
      Message: "New task has been created!",
      newTask
    });
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

// route for retrieving all task
router.get("/", async (req, res) => {
  try {
    const tasks = await Tasks.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// route for retrieving specified task
router.get("/:id", getTask, (req, res) => {
  res.json(res.task);
});

// route for updating task
router.patch("/:id", getTask, async (req, res) => {
  if (req.body.name != null) {
    res.task.name = req.body.name;
  }
  if (req.body.name != null) {
    res.task.DueDate = req.body.DueDate;
  }
  if (req.body.name != null) {
    res.task.CompletionDate = req.body.CompletionDate;
  }
  if (req.body.name != null) {
    res.task.Status = req.body.Status;
  }

  try {
    const updatedTask = await res.task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: error.message });
  }
});

// route for deleting task
router.delete("/:id", getTask, async (req, res) => {
  try {
    await res.task.remove();
    res.json({ message: "Task has been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTask(req, res, next) {
  let task;
  try {
    task = await Tasks.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({
        message: "Cannot find task with this ID."
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.task = task;
  next();
}

module.exports = router;
