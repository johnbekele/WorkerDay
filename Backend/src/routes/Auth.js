import express from 'express';
import Auth from '../controllers/AuthController.js';
import verifyJWT from '../middleware/verifyJwt.js';

const router = express.Router();

router.post('/login', Auth.login);
router.post('/logout', Auth.logout);
router.get('/me', verifyJWT, Auth.getMe);

export default router;
