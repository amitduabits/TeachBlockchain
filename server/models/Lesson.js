const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  input: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  expectedOutput: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const codeExampleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  explanation: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    enum: ['javascript', 'solidity', 'typescript'],
    required: true,
  },
});

const exerciseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: [{
    type: String,
    required: true,
  }],
  starterCode: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  tests: [testCaseSchema],
  hints: [{
    type: String,
    required: true,
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  estimatedTime: {
    type: Number,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const lessonSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  theory: {
    type: String,
    required: true,
  },
  examples: [codeExampleSchema],
  exercises: [exerciseSchema],
  prerequisites: [{
    type: String,
  }],
  objectives: [{
    type: String,
    required: true,
  }],
  estimatedTime: {
    type: Number,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  moduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Lesson', lessonSchema);
