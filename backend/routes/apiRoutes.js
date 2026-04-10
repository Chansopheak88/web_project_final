import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, data: { users: ["dara"] } });
});

router.post('/create', async (req, res) => {
  try {
    const { first_name, last_name, email, password, confirmPassword } = req.body;

    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: first_name, last_name, email, password, confirmPassword'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    const [existingUsers] = await User.loginUser(email);
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.save(first_name, last_name, email, hashedPassword);

    console.log("✅ Registered:", first_name, last_name, email);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { name: `${first_name} ${last_name}`, email }
    });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;