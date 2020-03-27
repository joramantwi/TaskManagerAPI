const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  DueDate: {
    type: String,
    required: true
  },
  CompletionDate: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Task", taskSchema);
