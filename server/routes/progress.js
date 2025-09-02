const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Module = require('../models/Module');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @desc    Get user progress
// @route   GET /api/progress
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get all progress records for the user
    const progressRecords = await Progress.find({ userId: req.user.id })
      .populate('moduleId', 'title id')
      .sort({ createdAt: -1 });

    // Get module progress
    const modules = await Module.find({ isActive: true }).sort({ order: 1 });
    const moduleProgress = modules.map(module => {
      const moduleProgressRecords = progressRecords.filter(
        record => record.moduleId._id.toString() === module._id.toString()
      );

      const completedLessons = moduleProgressRecords.filter(
        record => record.type === 'lesson' && record.completed
      ).length;

      const completedExercises = moduleProgressRecords.filter(
        record => record.type === 'exercise' && record.completed
      ).length;

      const completedProjects = moduleProgressRecords.filter(
        record => record.type === 'project' && record.completed
      ).length;

      const totalLessons = module.lessons.length;
      const totalExercises = moduleProgressRecords.filter(
        record => record.type === 'exercise'
      ).length;
      const totalProjects = module.projects.length;

      const progress = totalLessons + totalExercises + totalProjects > 0 
        ? Math.round(((completedLessons + completedExercises + completedProjects) / 
            (totalLessons + totalExercises + totalProjects)) * 100)
        : 0;

      const timeSpent = moduleProgressRecords.reduce(
        (total, record) => total + (record.timeSpent || 0), 0
      );

      const lastAccessed = moduleProgressRecords.length > 0 
        ? moduleProgressRecords[0].lastAttempt 
        : null;

      return {
        moduleId: module.id,
        title: module.title,
        completedLessons,
        totalLessons,
        completedExercises,
        totalExercises,
        completedProjects,
        totalProjects,
        progress,
        timeSpent,
        lastAccessed,
      };
    });

    const userProgress = {
      userId: user._id,
      totalLessons: progressRecords.filter(record => record.type === 'lesson' && record.completed).length,
      completedLessons: progressRecords.filter(record => record.type === 'lesson' && record.completed).length,
      totalExercises: progressRecords.filter(record => record.type === 'exercise').length,
      completedExercises: progressRecords.filter(record => record.type === 'exercise' && record.completed).length,
      totalProjects: progressRecords.filter(record => record.type === 'project').length,
      completedProjects: progressRecords.filter(record => record.type === 'project' && record.completed).length,
      totalTimeSpent: progressRecords.reduce((total, record) => total + (record.timeSpent || 0), 0),
      currentLevel: user.level,
      experience: user.experience,
      streak: user.streak,
      achievements: user.achievements,
      moduleProgress,
    };

    res.json({
      success: true,
      progress: userProgress,
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update progress
// @route   PUT /api/progress
// @access  Private
router.put('/', protect, [
  body('moduleId').exists().withMessage('Module ID is required'),
  body('type').isIn(['lesson', 'exercise', 'project']).withMessage('Type must be lesson, exercise, or project'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { moduleId, lessonId, exerciseId, projectId, type, timeSpent } = req.body;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      ...(lessonId && { lessonId }),
      ...(exerciseId && { exerciseId }),
      ...(projectId && { projectId }),
    });

    if (progress) {
      // Update existing progress
      progress.timeSpent = (progress.timeSpent || 0) + (timeSpent || 0);
      progress.lastAttempt = new Date();
    } else {
      // Create new progress
      progress = await Progress.create({
        userId: req.user.id,
        moduleId: module._id,
        lessonId,
        exerciseId,
        projectId,
        type,
        timeSpent: timeSpent || 0,
        lastAttempt: new Date(),
      });
    }

    await progress.save();

    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Complete lesson
// @route   POST /api/progress/lessons
// @access  Private
router.post('/lessons', protect, [
  body('moduleId').exists().withMessage('Module ID is required'),
  body('lessonId').exists().withMessage('Lesson ID is required'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { moduleId, lessonId, timeSpent } = req.body;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const lesson = await Lesson.findOne({ id: lessonId, moduleId: module._id });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    // Check if lesson is already completed
    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      lessonId: lesson._id,
    });

    if (progress && progress.completed) {
      return res.status(400).json({ message: 'Lesson already completed' });
    }

    if (progress) {
      // Update existing progress
      progress.completed = true;
      progress.timeSpent = (progress.timeSpent || 0) + timeSpent;
      progress.lastAttempt = new Date();
    } else {
      // Create new progress
      progress = await Progress.create({
        userId: req.user.id,
        moduleId: module._id,
        lessonId: lesson._id,
        type: 'lesson',
        completed: true,
        timeSpent,
        lastAttempt: new Date(),
      });
    }

    await progress.save();

    // Update user's completed lessons and experience
    const user = await User.findById(req.user.id);
    if (!user.completedLessons.includes(lesson._id)) {
      user.completedLessons.push(lesson._id);
    }

    const experienceGained = 10; // Base experience for completing a lesson
    const levelUp = user.addExperience(experienceGained);
    await user.save();

    res.json({
      success: true,
      message: 'Lesson completed successfully!',
      experienceGained,
      levelUp,
      moduleId,
      timeSpent,
    });
  } catch (error) {
    console.error('Complete lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Complete exercise
// @route   POST /api/progress/exercises
// @access  Private
router.post('/exercises', protect, [
  body('moduleId').exists().withMessage('Module ID is required'),
  body('exerciseId').exists().withMessage('Exercise ID is required'),
  body('code').exists().withMessage('Code is required'),
  body('testResults').isArray().withMessage('Test results must be an array'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number'),
  body('attempts').isNumeric().withMessage('Attempts must be a number'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { moduleId, exerciseId, code, testResults, timeSpent, attempts } = req.body;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Calculate score based on test results
    const passedTests = testResults.filter(result => result.passed).length;
    const score = Math.round((passedTests / testResults.length) * 100);
    const completed = score >= 80; // 80% threshold for completion

    // Check if exercise is already completed
    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      exerciseId: exerciseId,
    });

    if (progress) {
      // Update existing progress
      progress.attempts = attempts;
      progress.timeSpent = (progress.timeSpent || 0) + timeSpent;
      progress.lastAttempt = new Date();
      progress.code = code;
      progress.testResults = testResults;
      progress.score = Math.max(progress.score || 0, score);
      progress.completed = progress.completed || completed;
    } else {
      // Create new progress
      progress = await Progress.create({
        userId: req.user.id,
        moduleId: module._id,
        exerciseId: exerciseId,
        type: 'exercise',
        completed,
        score,
        timeSpent,
        attempts,
        lastAttempt: new Date(),
        code,
        testResults,
      });
    }

    await progress.save();

    // Update user's completed exercises and experience if completed
    let experienceGained = 0;
    if (completed && !progress.completed) {
      const user = await User.findById(req.user.id);
      experienceGained = 15; // Base experience for completing an exercise
      const levelUp = user.addExperience(experienceGained);
      await user.save();
    }

    res.json({
      success: true,
      message: completed ? 'Exercise completed successfully!' : 'Exercise submitted. Keep practicing!',
      score,
      completed,
      experienceGained,
      moduleId,
      timeSpent,
    });
  } catch (error) {
    console.error('Complete exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Complete project
// @route   POST /api/progress/projects
// @access  Private
router.post('/projects', protect, [
  body('moduleId').exists().withMessage('Module ID is required'),
  body('projectId').exists().withMessage('Project ID is required'),
  body('code').exists().withMessage('Code is required'),
  body('testResults').isArray().withMessage('Test results must be an array'),
  body('timeSpent').isNumeric().withMessage('Time spent must be a number'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { moduleId, projectId, code, testResults, timeSpent } = req.body;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const project = module.projects.find(proj => proj.id === projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Calculate score based on test results
    const passedTests = testResults.filter(result => result.passed).length;
    const score = Math.round((passedTests / testResults.length) * 100);
    const completed = score >= 80; // 80% threshold for completion

    // Check if project is already completed
    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      projectId: projectId,
    });

    if (progress) {
      // Update existing progress
      progress.attempts = (progress.attempts || 0) + 1;
      progress.timeSpent = (progress.timeSpent || 0) + timeSpent;
      progress.lastAttempt = new Date();
      progress.code = code;
      progress.testResults = testResults;
      progress.score = Math.max(progress.score || 0, score);
      progress.completed = progress.completed || completed;
    } else {
      // Create new progress
      progress = await Progress.create({
        userId: req.user.id,
        moduleId: module._id,
        projectId: projectId,
        type: 'project',
        completed,
        score,
        timeSpent,
        attempts: 1,
        lastAttempt: new Date(),
        code,
        testResults,
      });
    }

    await progress.save();

    // Update user's completed projects and experience if completed
    let experienceGained = 0;
    if (completed && !progress.completed) {
      const user = await User.findById(req.user.id);
      experienceGained = 25; // Base experience for completing a project
      const levelUp = user.addExperience(experienceGained);
      await user.save();
    }

    res.json({
      success: true,
      message: completed ? 'Project completed successfully!' : 'Project submitted. Keep working on it!',
      score,
      completed,
      experienceGained,
      moduleId,
      timeSpent,
    });
  } catch (error) {
    console.error('Complete project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get leaderboard
// @route   GET /api/progress/leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({})
      .select('name avatar level experience completedLessons completedExercises completedProjects streak')
      .sort({ experience: -1 })
      .limit(50);

    const leaderboard = users.map((user, index) => ({
      userId: user._id,
      name: user.name,
      avatar: user.avatar,
      level: user.level,
      experience: user.experience,
      completedLessons: user.completedLessons.length,
      completedExercises: user.completedExercises.length,
      completedProjects: user.completedProjects.length,
      streak: user.streak,
      rank: index + 1,
    }));

    res.json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    console.error('Get leaderboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get achievements
// @route   GET /api/progress/achievements
// @access  Private
router.get('/achievements', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      achievements: user.achievements,
    });
  } catch (error) {
    console.error('Get achievements error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get stats
// @route   GET /api/progress/stats
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const progressRecords = await Progress.find({ userId: req.user.id });
    
    const stats = {
      totalTimeSpent: progressRecords.reduce((total, record) => total + (record.timeSpent || 0), 0),
      totalAttempts: progressRecords.reduce((total, record) => total + (record.attempts || 0), 0),
      averageScore: progressRecords.length > 0 
        ? Math.round(progressRecords.reduce((total, record) => total + (record.score || 0), 0) / progressRecords.length)
        : 0,
      completionRate: progressRecords.length > 0
        ? Math.round((progressRecords.filter(record => record.completed).length / progressRecords.length) * 100)
        : 0,
      currentStreak: user.streak,
      level: user.level,
      experience: user.experience,
      experienceToNextLevel: 100 - (user.experience % 100),
    };

    res.json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
