import express from 'express';
import User from '../models/User.js';

const app = express();

const getAllEmployees = async (req, res) => {
  const employees = await User.findAll();
  res.json(employees);
};

export default getAllEmployees;
