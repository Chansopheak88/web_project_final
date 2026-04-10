import { Router } from 'express';
const router = Router();
// Removed getCreateUser and login from this import
import { createUser, loginUser, listUser, findUser } from '../controllers/userController.js';
import { isAuth, isGuest } from '../middleware/authMiddleware.js';

// 1. DATA ROUTES (Used by React)
router.post('/create', createUser);
router.post('/login', isGuest, loginUser);
router.get('/dashboard', isAuth, listUser);
router.post('/dashboard', isAuth, findUser);

// 2. LOGOUT ROUTE
router.post('/logout', (req, res) => { 
    req.session.destroy(); 
    res.json({ success: true, message: 'Logged out' }); 
});

// Note: Removed the router.get routes because React handles the UI now.

export default router;
