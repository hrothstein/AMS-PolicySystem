const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// POST /api/v1/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Simple admin authentication
    if (username !== 'admin') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (password !== adminPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { username: 'admin', role: 'admin' },
      process.env.JWT_SECRET || 'demo-secret-key',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { username: 'admin', role: 'admin' }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
