const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  column: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'],
    required: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Task', taskSchema);
