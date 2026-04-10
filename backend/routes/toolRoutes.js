import express from 'express';
<<<<<<< HEAD
import toolController from '../controllers/toolController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', toolController.getAllTools);
router.get('/:id', toolController.getToolDetails);

// Protected route — /add must be BEFORE /:id
router.post('/add', isAuthenticated, toolController.addTool);

=======
const router = express.Router();
import toolController from '../controllers/toolController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
// ... rest stays the same
// change bottom line to:
>>>>>>> 0d6948a627533ef766519f9bf2797a05cacbdd0e
export default router;