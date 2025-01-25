import Request from '../models/requestModel.js';
import chalk from 'chalk';
import { Op } from 'sequelize';
import User from '../models/User.js';

// Get all requests for a Admin and manager

const getAllRequests = async (req, res) => {
  const managerId = req.user.id;
  const role = req.user.role;

  try {
    let requests;

    if (role === 'Admin') {
      requests = await Request.findAll({
        where: { requester_role: 'Manager' },
      });
    } else if (role === 'Manager') {
      requests = await Request.findAll({
        where: { requester_role: 'Employee' },
      });
    } else {
      return res
        .status(403)
        .json({ msg: 'You are not authorized to view requests' });
    }

    if (!requests || requests.length == 0) {
      return res.status(404).json({ msg: 'No requests found' });
    }
    return res.status(200).json({ requests });
  } catch (err) {
    console.error(chalk.red(err));
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get a single request by ID

const getRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await Request.findByPk(id);

    if (!request) return res.status(404).json({ msg: 'Request not found' });

    return res.status(200).json({ request });
  } catch (err) {
    console.error(chalk.red(err));
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a new Mnager request
const createManagerRequest = async (req, res) => {
  const { employeeEmail, requestType, reason } = req.body;
  const managerId = req.user.id;

  const employee = await User.findOne({ where: { email: employeeEmail } });
  if (!employee) return res.status(404).json({ msg: 'Employee not found' });

  try {
    const newRequest = await Request.create({
      requester_role: 'Manager',
      employee_id: employee.id,
      manager_id: managerId,
      request_type: requestType,
      reason: reason,
    });

    res.status(201).json({
      message: 'Request created successfully',
      newRequest,
    });
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500).json({ msg: 'Server error' });
  }
};

//create a new employee request

const createEmployeeRequest = async (req, res) => {
  const { requestType, reason, manager_email } = req.body;

  // Validate that necessary fields are provided
  if (!requestType || !reason || !manager_email) {
    return res
      .status(400)
      .json({ msg: 'Request type, reason, and manager email are required' });
  }

  try {
    // Find the manager based on the provided email
    const manager = await User.findOne({ where: { email: manager_email } });

    if (!manager) {
      return res.status(404).json({ msg: 'Manager not found' });
    }

    // Log the manager data for debugging
    console.log(manager.toJSON()); // Make sure you get the actual manager data

    // Assuming req.user.id is set properly by some authentication middleware
    if (!req.user || !req.user.id) {
      return res
        .status(400)
        .json({ msg: 'Invalid user. Please log in first.' });
    }

    // Create the new request in the database
    const newRequest = await Request.create({
      requester_role: 'Employee',
      employeeId: req.user.id, // Make sure the field name matches the model
      managerId: manager.id, // Make sure the field name matches the model
      requestType: requestType, // Ensure this matches the column name in the model
      reason: reason,
    });

    res.status(201).json({
      message: 'Request created successfully',
      newRequest,
    });
  } catch (error) {
    // Log the error with more details for debugging
    console.error(chalk.red(error));

    // Send a response with a more generic error message
    res.status(500).json({ msg: 'Server error, unable to create the request' });
  }
};

// Update request

const updateRequest = async (req, res) => {
  const { requestType, reason } = req.body;
  const { requestId } = req.params;

  const request = await Request.findByPk(requestId);

  if (!request) return res.status(404).json({ msg: 'Request not found' });

  try {
    const updatedRequest = await request.update({
      request_type: requestType,
      reason: reason,
    });

    res.status(200).json({
      message: 'Request updated successfully',
      updatedRequest,
    });
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500).json({ msg: 'Server error' });
  }
};

//respond to  request

const respondRequest = async (req, res) => {
  const { response } = req.body;
  const { requestId } = req.params;
  const approverId = req.user.id;

  const request = await Request.findByPk(requestId); //find the request object

  if (!request) return res.status(404).json({ msg: 'Request not found' });
  if (request.status !== 'pending')
    return res.status(400).json({ msg: 'Request already processed' });

  //update request status

  try {
    const updatedRequest = await request.update({
      status: response,
      approved_by: approverId,
    });

    res.status(200).json({
      message: 'Request approved successfully',
      updatedRequest,
    });
  } catch (error) {
    console.error(chalk.red(error));
    res.status(500).json({ msg: 'Server error' });
  }
};

//

export default {
  getAllRequests,
  getRequestById,
  createManagerRequest,
  createEmployeeRequest,
  updateRequest,
  respondRequest,
};
