const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  output: {
    type: String,
    required: true,
  },
  error: {
    type: String,
  },
});

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  },
  exerciseId: {
    type: String,
  },
  projectId: {
    type: String,
  },
  type: {
    type: String,
    enum: ['lesson', 'exercise', 'project'],
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  timeSpent: {
    type: Number,
    default: 0, // in minutes
  },
  attempts: {
    type: Number,
    default: 0,
  },
  lastAttempt: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
  },
  testResults: [testResultSchema],
  feedback: {
    type: String,
  },
  hintsUsed: [{
    type: Number,
  }],
}, {
  timestamps: true,
});

// Index for efficient queries
progressSchema.index({ userId: 1, moduleId: 1 });
progressSchema.index({ userId: 1, type: 1 });
progressSchema.index({ userId: 1, completed: 1 });

module.exports = mongoose.model('Progress', progressSchema);
