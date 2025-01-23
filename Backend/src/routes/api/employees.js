import express from 'express';
import employeesController from '../../controllers/employeesController.js';
import verifyJWT from '../../middleware/verifyJwt.js';
import { Admin, Manager } from '../../middleware/verifyRole.js';

const router = express.Router();

router
  .route('/')
  .get(verifyJWT, employeesController.getAllEmployees)
  .post(verifyJWT, employeesController.addEmployee)
  .put(verifyJWT, Manager, employeesController.updateEmployee)
  .delete(verifyJWT, Admin, employeesController.deleteEmployee);

export default router;
