import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
<<<<<<< HEAD

const router = express.Router();
=======
import { OAuth2Client } from 'google-auth-library';

const router = express.Router();
const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

const requireAuth = (req, res, next) => {
  if (!req.session?.userId) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  next();
};

const requireAdminAccess = (req, res, next) => {
  if (!req.session?.isAdminAuthorized) {
    return res.status(401).json({ success: false, message: 'Admin authentication required' });
  }
  next();
};
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e

router.get('/test', (req, res) => {
  res.status(200).json({ success: true, data: { users: ["dara"] } });
});

<<<<<<< HEAD
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
=======
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
        authProvider: currentUser.auth_provider,
        role: currentUser.role,
        status: currentUser.status,
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
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
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
<<<<<<< HEAD
    await User.save(first_name, last_name, email, hashedPassword);

    console.log("✅ Registered:", first_name, last_name, email);
=======
    await User.save(user_name, email, hashedPassword);

    console.log("✅ Registered:", user_name, email);
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e

    res.status(201).json({
      success: true,
      message: 'User created successfully',
<<<<<<< HEAD
      user: { name: `${first_name} ${last_name}`, email }
=======
      user: { name: user_name, email }
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
    });

  } catch (error) {
    console.error('Register error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

<<<<<<< HEAD
export default router;
=======
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
        authProvider: user.auth_provider || 'local',
        role: user.role,
        status: user.status,
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

// ---------- Admin panel access ----------
router.get('/admin/access', (req, res) => {
  if (req.session?.isAdminAuthorized) {
    return res.status(200).json({ success: true, authorized: true });
  }
  return res.status(401).json({ success: false, authorized: false, message: 'Admin authentication required' });
});

router.post('/admin/access', async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'username and password are required' });
  }

  try {
    // First check if they're logging in with hardcoded admin credentials
    const expectedUsername = process.env.ADMIN_PANEL_USER || 'admin';
    const expectedPassword = process.env.ADMIN_PANEL_PASSWORD || 'admin123';

    if (username === expectedUsername && password === expectedPassword) {
      req.session.isAdminAuthorized = true;
      req.session.adminUsername = username;
      return res.status(200).json({ success: true, message: 'Admin access granted' });
    }

    // Otherwise, check if they're a database user with Admin role
    const [userRows] = await User.findByEmail(username);
    const user = userRows?.[0];

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    // Check if user has Admin role
    if (user.role !== 'Admin') {
      return res.status(403).json({ success: false, message: 'User does not have admin permissions' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    req.session.isAdminAuthorized = true;
    req.session.adminUsername = user.email;
    req.session.userId = user.id;

    return res.status(200).json({ success: true, message: 'Admin access granted' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Authentication error' });
  }
});

router.post('/admin/access/logout', (req, res) => {
  if (req.session) {
    req.session.isAdminAuthorized = false;
    req.session.adminUsername = null;
  }
  return res.status(200).json({ success: true, message: 'Admin access removed' });
});

// ---------- Admin data APIs ----------
router.get('/admin/users', requireAdminAccess, async (req, res) => {
  try {
    const query = (req.query.query || '').toString();
    const status = (req.query.status || 'all').toString();

    const [rows] = await User.fetchAdminUsers({ query, status });

    return res.status(200).json({
      success: true,
      users: rows.map((user) => ({
        id: user.id,
        name: user.user_name,
        email: user.email,
        role: user.role,
        status: user.status,
        authProvider: user.auth_provider,
        avatarUrl: user.avatar_url,
        lastLoginAt: user.last_login_at,
        createdAt: user.created_at,
      })),
    });
  } catch (error) {
    console.error('Admin users fetch error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/admin/users', requireAdminAccess, async (req, res) => {
  try {
    const { user_name, email, password, role = 'User', status = 'active' } = req.body;
    const validRoles = ['User', 'Admin'];

    if (!user_name || !email || !password) {
      return res.status(400).json({ success: false, message: 'user_name, email and password are required' });
    }
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'role must be User or Admin' });
    }

    const [existingUsers] = await User.findByEmail(email);
    if (existingUsers.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await User.createAdminUser({
      user_name,
      email,
      password: hashedPassword,
      role,
      status,
      auth_provider: 'local',
    });

    await User.createSecurityAlert({
      severity: 'Low',
      title: 'User created',
      detail: `${user_name} (${email}) created by admin`,
    });

    return res.status(201).json({ success: true, id: result.insertId, message: 'User created' });
  } catch (error) {
    console.error('Admin create user error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/admin/users/:id', requireAdminAccess, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { user_name, email, role = 'User', status = 'active' } = req.body;
    const validRoles = ['User', 'Admin'];

    if (!id || !user_name || !email) {
      return res.status(400).json({ success: false, message: 'id, user_name and email are required' });
    }
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'role must be User or Admin' });
    }

    const [existing] = await User.findById(id);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const [emailOwner] = await User.findByEmail(email);
    if (emailOwner.length > 0 && emailOwner[0].id !== id) {
      return res.status(409).json({ success: false, message: 'Email already used by another user' });
    }

    await User.updateAdminUser(id, { user_name, email, role, status });

    await User.createSecurityAlert({
      severity: 'Low',
      title: 'User updated',
      detail: `${user_name} (${email}) updated by admin`,
    });

    return res.status(200).json({ success: true, message: 'User updated' });
  } catch (error) {
    console.error('Admin update user error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.patch('/admin/users/:id/status', requireAdminAccess, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({ success: false, message: 'id and status are required' });
    }

    const validStatus = ['active', 'pending', 'suspended'];
    if (!validStatus.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const [existing] = await User.findById(id);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await User.updateStatus(id, status);

    await User.createSecurityAlert({
      severity: status === 'suspended' ? 'High' : 'Medium',
      title: `User status changed to ${status}`,
      detail: `${existing[0].user_name} (${existing[0].email}) status changed by admin`,
    });

    return res.status(200).json({ success: true, message: 'Status updated' });
  } catch (error) {
    console.error('Admin status update error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/admin/users/:id', requireAdminAccess, async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    if (req.session.userId === id) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }

    const [existing] = await User.findById(id);
    if (!existing.length) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await User.deleteById(id);

    await User.createSecurityAlert({
      severity: 'High',
      title: 'User deleted',
      detail: `${existing[0].user_name} (${existing[0].email}) deleted by admin`,
    });

    return res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('Admin delete user error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/admin/stats', requireAdminAccess, async (req, res) => {
  try {
    const [statsRows] = await User.getAdminStats();
    const [alertsRows] = await User.getOpenAlertsCount();

    const stats = statsRows[0] || { totalUsers: 0, activeSessions: 0, moderators: 0 };
    const alerts = alertsRows[0] || { openAlerts: 0 };

    return res.status(200).json({
      success: true,
      stats: {
        totalUsers: Number(stats.totalUsers || 0),
        activeSessions: Number(stats.activeSessions || 0),
        openAlerts: Number(alerts.openAlerts || 0),
        moderators: Number(stats.moderators || 0),
      },
    });
  } catch (error) {
    console.error('Admin stats fetch error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/admin/alerts', requireAdminAccess, async (req, res) => {
  try {
    const [rows] = await User.getSecurityAlerts();
    return res.status(200).json({ success: true, alerts: rows });
  } catch (error) {
    console.error('Admin alerts fetch error:', error.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
