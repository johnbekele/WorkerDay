import express from 'express';
import getAllEmployees from '../../controllers/employeesController.js';
import verifyJWT from '../../middleware/verifyJwt.js';

const router = express.Router();

router.route('/').get(verifyJWT, getAllEmployees);

export default router;
