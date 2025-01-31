import express from 'express';
import employeesController from '../../controllers/employeesController.js';
import verifyJWT from '../../middleware/verifyJwt.js';
import { Admin, Manager, AdminOrManager } from '../../middleware/verifyRole.js';

const router = express.Router();

router
  .route('/manager')
  .get(verifyJWT, Manager, employeesController.getAllEmployees)
  .post(verifyJWT, Manager, employeesController.addEmployee);

router
  .route('/:id')
  .put(verifyJWT, AdminOrManager, employeesController.updateEmployee)
  .delete(verifyJWT, AdminOrManager, employeesController.deleteEmployee);

router.route('/admin').get(verifyJWT, Admin, employeesController.getAllUsers);

router.route('/myprofile').get(verifyJWT, employeesController.getEmployeeById);

export default router;
