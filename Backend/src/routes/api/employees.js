import express from 'express';
import employeesController from '../../controllers/employeesController.js';
import verifyJWT from '../../middleware/verifyJwt.js';
import { Admin, Manager, AdminOrManager } from '../../middleware/verifyRole.js';

const router = express.Router();

router
  .route('/')
  .get(verifyJWT, Manager, employeesController.getAllEmployees)
  .post(verifyJWT, Manager, employeesController.addEmployee);

router
  .route('/:id')
  .put(verifyJWT, Manager, employeesController.updateEmployee)
  .delete(verifyJWT, AdminOrManager, employeesController.deleteEmployee);

router.route('/admin').get(verifyJWT, Admin, employeesController.getAllUsers);

export default router;
