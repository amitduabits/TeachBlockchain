const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
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
  requirements: [{
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
  tests: [{
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
});

const moduleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  projects: [projectSchema],
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
  isActive: {
    type: Boolean,
    default: true,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  tags: [{
    type: String,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Module', moduleSchema);
