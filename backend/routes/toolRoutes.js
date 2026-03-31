import express from 'express';
const router = express.Router();
import toolController from '../controllers/toolController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
// ... rest stays the same
// change bottom line to:
export default router;