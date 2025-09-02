const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  level: {
    type: Number,
    default: 1,
  },
  experience: {
    type: Number,
    default: 0,
  },
  completedLessons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
  }],
  completedExercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  }],
  completedProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  streak: {
    type: Number,
    default: 0,
  },
  lastActiveDate: {
    type: Date,
    default: Date.now,
  },
  achievements: [{
    achievementId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Achievement',
    },
    unlockedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    codeEditorTheme: {
      type: String,
      enum: ['vs-light', 'vs-dark'],
      default: 'vs-light',
    },
    fontSize: {
      type: Number,
      default: 14,
    },
    tabSize: {
      type: Number,
      default: 2,
    },
    wordWrap: {
      type: Boolean,
      default: true,
    },
    minimap: {
      type: Boolean,
      default: true,
    },
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  emailVerificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
}, {
  timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Calculate level based on experience
userSchema.methods.calculateLevel = function() {
  const experience = this.experience;
  const level = Math.floor(experience / 100) + 1;
  this.level = level;
  return level;
};

// Add experience and check for level up
userSchema.methods.addExperience = function(amount) {
  const oldLevel = this.level;
  this.experience += amount;
  this.calculateLevel();
  
  return {
    oldLevel,
    newLevel: this.level,
    leveledUp: this.level > oldLevel,
    experienceGained: amount,
  };
};

// Update streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastActive = new Date(this.lastActiveDate);
  const diffTime = today - lastActive;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    // Consecutive day
    this.streak += 1;
  } else if (diffDays > 1) {
    // Streak broken
    this.streak = 1;
  }
  // If diffDays === 0, same day, don't change streak
  
  this.lastActiveDate = today;
  return this.streak;
};

module.exports = mongoose.model('User', userSchema);
