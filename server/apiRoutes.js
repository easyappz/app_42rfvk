const express = require('express');

const router = express.Router();

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate/add - Addition
router.post('/calculate/add', (req, res) => {
  try {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input, numbers are required' });
    }
    const result = num1 + num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during addition' });
  }
});

// POST /api/calculate/subtract - Subtraction
router.post('/calculate/subtract', (req, res) => {
  try {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input, numbers are required' });
    }
    const result = num1 - num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during subtraction' });
  }
});

// POST /api/calculate/multiply - Multiplication
router.post('/calculate/multiply', (req, res) => {
  try {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input, numbers are required' });
    }
    const result = num1 * num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during multiplication' });
  }
});

// POST /api/calculate/divide - Division
router.post('/calculate/divide', (req, res) => {
  try {
    const { num1, num2 } = req.body;
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input, numbers are required' });
    }
    if (num2 === 0) {
      return res.status(400).json({ error: 'Division by zero is not allowed' });
    }
    const result = num1 / num2;
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during division' });
  }
});

module.exports = router;
