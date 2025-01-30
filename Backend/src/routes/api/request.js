import express from 'express';
import requestController from '../../controllers/requestController.js';
import verifyJWT from '../../middleware/verifyJwt.js';
import { Admin, Manager, Employee } from '../../middleware/verifyRole.js';

const router = express.Router();

router.use(verifyJWT);

// manager routes
router
  .route('/manager')
  .get(Manager, requestController.getAllRequests)
  .post(Manager, requestController.createManagerRequest)
  .put(Manager, requestController.updateRequest);

router.route('/manager/:id').post(Manager, requestController.respondRequest);

// Admin routes
router
  .route('/admin')
  .get(Admin, requestController.getAllRequests)
  .post(Admin, requestController.respondRequest);

router.route('/admin/:id').post(Admin, requestController.respondRequest);

//Employees routes

router
  .route('/employee')
  .post(Employee, requestController.createEmployeeRequest);

router
  .route('/:id')
  .get(Employee, requestController.getRequestById)
  .put(Employee, requestController.updateRequest);

// Rout with parameters

export default router;
