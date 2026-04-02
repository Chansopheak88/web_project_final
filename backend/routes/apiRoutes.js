import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, data: { users: ["dara"] } });
});

router.get('/me', async (req, res) => {
  try {
    if (!req.session?.userId) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const [rows] = await User.findById(req.session.userId);
    const currentUser = rows[0];

    if (!currentUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: currentUser.id,
        name: currentUser.user_name,
        email: currentUser.email,
        authProvider: currentUser.auth_provider
      }
    });
  } catch (error) {
    console.error('Me endpoint error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
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

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const [rows] = await User.findByEmail(email);
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const user = rows[0];
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: 'This account uses Google login. Please use Google Sign-In.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    req.session.userId = user.id;
    req.session.userName = user.user_name;
    await User.updateLocalLastLogin(user.id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.user_name,
        email: user.email,
        authProvider: user.auth_provider || 'local'
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/auth/google', async (req, res) => {
  try {
    if (!googleClient) {
      return res.status(500).json({
        success: false,
        message: 'Google auth is not configured on server'
      });
    }

    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential token is required'
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Google token payload'
      });
    }

    if (payload.email_verified === false) {
      return res.status(400).json({
        success: false,
        message: 'Google email is not verified'
      });
    }

    const googleUser = {
      name: payload.name || payload.email.split('@')[0],
      email: payload.email,
      googleId: payload.sub,
      avatarUrl: payload.picture || null
    };

    const [existingUsers] = await User.findByEmail(googleUser.email);
    let userId;

    if (existingUsers.length > 0) {
      const existingUser = existingUsers[0];
      userId = existingUser.id;
      await User.updateGoogleUser(existingUser.id, {
        user_name: googleUser.name,
        google_id: googleUser.googleId,
        avatar_url: googleUser.avatarUrl
      });
    } else {
      const placeholderPassword = await bcrypt.hash(
        `${googleUser.googleId}:${Date.now()}`,
        10
      );

      const [insertResult] = await User.createGoogleUser({
        user_name: googleUser.name,
        email: googleUser.email,
        password: placeholderPassword,
        google_id: googleUser.googleId,
        avatar_url: googleUser.avatarUrl
      });

      userId = insertResult.insertId;
    }

    req.session.userId = userId;
    req.session.userName = googleUser.name;

    return res.status(200).json({
      success: true,
      message: 'Google login successful',
      user: {
        id: userId,
        name: googleUser.name,
        email: googleUser.email,
        authProvider: 'google',
        avatarUrl: googleUser.avatarUrl
      }
    });
  } catch (error) {
    console.error('Google auth error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Google authentication failed'
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    return res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
});

export default router;
