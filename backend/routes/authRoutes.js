const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendEmail, sendVerificationEmail } = require('../services/emailService');
const dotenv = require('dotenv');
dotenv.config();
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'Username or email already exists' 
      });
    }

    const user = new User({ username, email, password });
    await user.save();
    
    // Send welcome email
    sendEmail(email, 'Welcome to Recipe Management', 'Thank you for registering!');
    
    // Send verification email
    await sendVerificationEmail(email);
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    // Handle other potential errors
    res.status(500).json({ message: 'An error occurred during registration', error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
