import express from 'express';
import Auth from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', Auth.login);
router.post('/logout', Auth.logout);

export default router;
