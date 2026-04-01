import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, data: { users: ["dara"] } });
});

router.post('/create', async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    if (!user_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: user_name, email, password'
      });
    }

    const [existingUsers] = await User.loginUser(email);
    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ✅ inside route
    await User.save(user_name, email, hashedPassword);      // ✅ inside route

    console.log("✅ Registered:", user_name, email);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: { name: user_name, email }
    });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;