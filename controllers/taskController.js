const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createTask = async (req, res) => {
  const { title, column } = req.body;

  console.log('Authenticated user:', req.user);

  try {
    // Assuming req.user has the authenticated user's ID (via authMiddleware)
    const newTask = new Task({ title, column, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, column } = req.body;
  try {
    const updatedTask = await Task.findByIdAndUpdate(id, { title, column }, { new: true });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
