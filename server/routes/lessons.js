const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Module = require('../models/Module');
const Lesson = require('../models/Lesson');
const Progress = require('../models/Progress');
const { protect } = require('../middleware/auth');
const MockDataService = require('../services/mockData');

const router = express.Router();

// @desc    Get all modules
// @route   GET /api/lessons/modules
// @access  Public
router.get('/modules', async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState === 1) {
      const modules = await Module.find({ isActive: true })
        .populate('lessons')
        .sort({ order: 1 });

      res.json({
        success: true,
        modules,
      });
    } else {
      // Use mock data when MongoDB is not available
      const modules = MockDataService.getModules();
      res.json({
        success: true,
        modules,
      });
    }
  } catch (error) {
    console.error('Get modules error:', error);
    // Fallback to mock data on error
    const modules = MockDataService.getModules();
    res.json({
      success: true,
      modules,
    });
  }
});

// @desc    Get single module
// @route   GET /api/lessons/modules/:id
// @access  Public
router.get('/modules/:id', async (req, res) => {
  try {
    const module = await Module.findOne({ id: req.params.id, isActive: true })
      .populate('lessons');

    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    res.json({
      success: true,
      module,
    });
  } catch (error) {
    console.error('Get module error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get lesson
// @route   GET /api/lessons/modules/:moduleId/lessons/:lessonId
// @access  Public
router.get('/modules/:moduleId/lessons/:lessonId', async (req, res) => {
  try {
    const { moduleId, lessonId } = req.params;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const lesson = await Lesson.findOne({ 
      id: lessonId, 
      moduleId: module._id 
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get exercise
// @route   GET /api/lessons/modules/:moduleId/exercises/:exerciseId
// @access  Public
router.get('/modules/:moduleId/exercises/:exerciseId', async (req, res) => {
  try {
    const { moduleId, exerciseId } = req.params;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const lesson = await Lesson.findOne({ moduleId: module._id });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const exercise = lesson.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    res.json({
      success: true,
      exercise,
    });
  } catch (error) {
    console.error('Get exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get project
// @route   GET /api/lessons/modules/:moduleId/projects/:projectId
// @access  Public
router.get('/modules/:moduleId/projects/:projectId', async (req, res) => {
  try {
    const { moduleId, projectId } = req.params;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const project = module.projects.find(proj => proj.id === projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Run tests
// @route   POST /api/lessons/run-tests
// @access  Public
router.post('/run-tests', [
  body('code').exists().withMessage('Code is required'),
  body('tests').isArray().withMessage('Tests must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { code, tests } = req.body;

    // In a real implementation, you would run the code in a sandboxed environment
    // For now, we'll simulate test results
    const results = tests.map((test, index) => {
      // Simulate test execution
      const passed = Math.random() > 0.3; // 70% pass rate for demo
      
      return {
        testId: test.id,
        passed,
        output: passed ? 'Test passed' : 'Test failed',
        error: passed ? null : 'Expected output did not match actual output',
      };
    });

    res.json({
      success: true,
      results,
    });
  } catch (error) {
    console.error('Run tests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Submit exercise
// @route   POST /api/lessons/modules/:moduleId/exercises/:exerciseId/submit
// @access  Private
router.post('/modules/:moduleId/exercises/:exerciseId/submit', protect, [
  body('code').exists().withMessage('Code is required'),
  body('testResults').isArray().withMessage('Test results must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { moduleId, exerciseId } = req.params;
    const { code, testResults } = req.body;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const lesson = await Lesson.findOne({ moduleId: module._id });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const exercise = lesson.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    // Calculate score based on test results
    const passedTests = testResults.filter(result => result.passed).length;
    const score = Math.round((passedTests / testResults.length) * 100);

    // Check if exercise is already completed
    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      exerciseId: exerciseId,
    });

    if (progress) {
      // Update existing progress
      progress.attempts += 1;
      progress.lastAttempt = new Date();
      progress.code = code;
      progress.testResults = testResults;
      progress.score = Math.max(progress.score || 0, score);
      progress.completed = score >= 80; // 80% threshold for completion
    } else {
      // Create new progress
      progress = await Progress.create({
        userId: req.user.id,
        moduleId: module._id,
        exerciseId: exerciseId,
        type: 'exercise',
        attempts: 1,
        lastAttempt: new Date(),
        code: code,
        testResults: testResults,
        score: score,
        completed: score >= 80,
      });
    }

    await progress.save();

    res.json({
      success: true,
      score,
      completed: progress.completed,
      message: progress.completed ? 'Exercise completed successfully!' : 'Exercise submitted. Keep practicing!',
    });
  } catch (error) {
    console.error('Submit exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Submit project
// @route   POST /api/lessons/modules/:moduleId/projects/:projectId/submit
// @access  Private
router.post('/modules/:moduleId/projects/:projectId/submit', protect, [
  body('code').exists().withMessage('Code is required'),
  body('testResults').isArray().withMessage('Test results must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { moduleId, projectId } = req.params;
    const { code, testResults } = req.body;

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

    // Check if project is already completed
    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      projectId: projectId,
    });

    if (progress) {
      // Update existing progress
      progress.attempts += 1;
      progress.lastAttempt = new Date();
      progress.code = code;
      progress.testResults = testResults;
      progress.score = Math.max(progress.score || 0, score);
      progress.completed = score >= 80; // 80% threshold for completion
    } else {
      // Create new progress
      progress = await Progress.create({
        userId: req.user.id,
        moduleId: module._id,
        projectId: projectId,
        type: 'project',
        attempts: 1,
        lastAttempt: new Date(),
        code: code,
        testResults: testResults,
        score: score,
        completed: score >= 80,
      });
    }

    await progress.save();

    res.json({
      success: true,
      score,
      completed: progress.completed,
      message: progress.completed ? 'Project completed successfully!' : 'Project submitted. Keep working on it!',
    });
  } catch (error) {
    console.error('Submit project error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get hint
// @route   GET /api/lessons/modules/:moduleId/exercises/:exerciseId/hints/:hintIndex
// @access  Private
router.get('/modules/:moduleId/exercises/:exerciseId/hints/:hintIndex', protect, async (req, res) => {
  try {
    const { moduleId, exerciseId, hintIndex } = req.params;

    const module = await Module.findOne({ id: moduleId, isActive: true });
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    const lesson = await Lesson.findOne({ moduleId: module._id });
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const exercise = lesson.exercises.find(ex => ex.id === exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    const hintIndexNum = parseInt(hintIndex);
    if (hintIndexNum < 0 || hintIndexNum >= exercise.hints.length) {
      return res.status(404).json({ message: 'Hint not found' });
    }

    const hint = exercise.hints[hintIndexNum];

    // Track hint usage
    let progress = await Progress.findOne({
      userId: req.user.id,
      moduleId: module._id,
      exerciseId: exerciseId,
    });

    if (progress) {
      if (!progress.hintsUsed.includes(hintIndexNum)) {
        progress.hintsUsed.push(hintIndexNum);
        await progress.save();
      }
    }

    res.json({
      success: true,
      hint,
      hintIndex: hintIndexNum,
      totalHints: exercise.hints.length,
    });
  } catch (error) {
    console.error('Get hint error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
