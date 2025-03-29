import express from 'express';
import AddUser from '../controllers/registerController.js';

const router = express.Router();

router.post('/', AddUser);

export default router;
