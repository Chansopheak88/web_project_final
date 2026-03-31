import { Router } from 'express';
const router = Router();
import { getCreateUser, createUser, login, loginUser, listUser, findUser } from '../controllers/userController.js';
import { isAuth, isGuest } from '../middleware/authMiddleware.js';

router.get('/', (req, res) => res.render('index', { layout: 'templates/mains', title: 'Home' }));
router.get('/create', isAuth, getCreateUser);
router.post('/create', createUser);
router.get('/login', isGuest, login);
router.post('/login', isGuest, loginUser);
router.get('/dashboard', isAuth, listUser);
router.post('/dashboard', isAuth, findUser);
router.get('/logout', (req, res) => { req.session.destroy(); res.redirect('/login'); });

export default router;