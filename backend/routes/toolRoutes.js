import express from 'express';
import toolController from '../controllers/toolController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', toolController.getAllTools);
router.get('/:id', toolController.getToolDetails);

// Protected route — /add must be BEFORE /:id
router.post('/add', isAuthenticated, toolController.addTool);

export default router;