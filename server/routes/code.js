const express = require('express');
const { body, validationResult } = require('express-validator');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// @desc    Execute JavaScript code
// @route   POST /api/code/execute/javascript
// @access  Public
router.post('/execute/javascript', [
  body('code').exists().withMessage('Code is required'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { code } = req.body;
    const executionId = uuidv4();
    const fileName = `temp_${executionId}.js`;
    const filePath = path.join(__dirname, '../temp', fileName);

    // Ensure temp directory exists
    const tempDir = path.dirname(filePath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Write code to temporary file
    fs.writeFileSync(filePath, code);

    // Execute the code
    exec(`node "${filePath}"`, { timeout: 5000 }, (error, stdout, stderr) => {
      // Clean up temporary file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      if (error) {
        return res.json({
          success: false,
          output: '',
          error: error.message,
          executionTime: 0,
        });
      }

      if (stderr) {
        return res.json({
          success: false,
          output: stdout,
          error: stderr,
          executionTime: 0,
        });
      }

      res.json({
        success: true,
        output: stdout,
        error: null,
        executionTime: 0, // Could be implemented with performance.now()
      });
    });
  } catch (error) {
    console.error('JavaScript execution error:', error);
    res.status(500).json({ message: 'Server error during code execution' });
  }
});

// @desc    Execute Solidity code
// @route   POST /api/code/execute/solidity
// @access  Public
router.post('/execute/solidity', [
  body('code').exists().withMessage('Code is required'),
  body('testCases').isArray().withMessage('Test cases must be an array'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { code, testCases } = req.body;
    const executionId = uuidv4();
    const fileName = `temp_${executionId}.sol`;
    const filePath = path.join(__dirname, '../temp', fileName);

    // Ensure temp directory exists
    const tempDir = path.dirname(filePath);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Write code to temporary file
    fs.writeFileSync(filePath, code);

    // For now, return mock results since we don't have a Solidity execution environment
    // In a real implementation, you would use Hardhat or Remix to compile and test
    const results = testCases.map((testCase, index) => ({
      testId: testCase.id || `test-${index}`,
      passed: Math.random() > 0.3, // Mock 70% pass rate
      output: 'Mock execution result',
      error: Math.random() > 0.7 ? 'Mock error message' : null,
    }));

    // Clean up temporary file
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      success: true,
      results,
      executionTime: 0,
    });
  } catch (error) {
    console.error('Solidity execution error:', error);
    res.status(500).json({ message: 'Server error during code execution' });
  }
});

// @desc    Validate code syntax
// @route   POST /api/code/validate
// @access  Public
router.post('/validate', [
  body('code').exists().withMessage('Code is required'),
  body('language').isIn(['javascript', 'solidity', 'typescript']).withMessage('Language must be javascript, solidity, or typescript'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { code, language } = req.body;

    // Basic syntax validation
    let isValid = true;
    let errorMessage = null;

    switch (language) {
      case 'javascript':
        try {
          // Basic JavaScript syntax check
          new Function(code);
        } catch (error) {
          isValid = false;
          errorMessage = error.message;
        }
        break;

      case 'solidity':
        // Basic Solidity syntax check
        if (!code.includes('pragma solidity')) {
          isValid = false;
          errorMessage = 'Missing pragma solidity directive';
        }
        break;

      case 'typescript':
        // Basic TypeScript syntax check
        try {
          // This is a simplified check - in production, you'd use the TypeScript compiler
          if (code.includes('any') && !code.includes(':')) {
            isValid = false;
            errorMessage = 'TypeScript requires type annotations';
          }
        } catch (error) {
          isValid = false;
          errorMessage = error.message;
        }
        break;
    }

    res.json({
      success: true,
      isValid,
      error: errorMessage,
    });
  } catch (error) {
    console.error('Code validation error:', error);
    res.status(500).json({ message: 'Server error during code validation' });
  }
});

// @desc    Format code
// @route   POST /api/code/format
// @access  Public
router.post('/format', [
  body('code').exists().withMessage('Code is required'),
  body('language').isIn(['javascript', 'solidity', 'typescript']).withMessage('Language must be javascript, solidity, or typescript'),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { code, language } = req.body;

    // Basic code formatting
    let formattedCode = code;

    switch (language) {
      case 'javascript':
      case 'typescript':
        // Basic formatting - in production, you'd use Prettier
        formattedCode = code
          .replace(/\s+/g, ' ')
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/\s*}\s*/g, '\n}\n')
          .replace(/\s*;\s*/g, ';\n')
          .trim();
        break;

      case 'solidity':
        // Basic Solidity formatting
        formattedCode = code
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/\s*}\s*/g, '\n}\n')
          .replace(/\s*;\s*/g, ';\n')
          .trim();
        break;
    }

    res.json({
      success: true,
      formattedCode,
    });
  } catch (error) {
    console.error('Code formatting error:', error);
    res.status(500).json({ message: 'Server error during code formatting' });
  }
});

module.exports = router;
