import express from 'express';
import requestController from '../../controllers/requestController.js';
import verifyJWT from '../../middleware/verifyJwt.js';
import { Admin, Manager, AdminOrManager } from '../../middleware/verifyRole.js';

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

router.route('/').post(verifyJWT, requestController.createEmployeeRequest);

router
  .route('/:id')
  .get(verifyJWT, requestController.getRequestById)
  .put(verifyJWT, requestController.updateRequest);

// Rout with parameters

export default router;
