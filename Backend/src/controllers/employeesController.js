import express from 'express';
import Users from '../models/User.js';

const app = express();

const getAllEmployees = async (req, res) => {
  const employees = await User.findAll();
  res.json(employees);
};

const addEmployee = async (req, res) => {
  const { username, email, password, role, manager_email } = req.body;
  if (!username || !email || !password || !role) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const userExists = await Users.findOne({
    where: {
      email: email,
      name: username,
    },
  });
  //check if user exists
  if (userExists) return res.status(409).send('User already exists');

  try {
    const user = await Users.create({
      name: username,
      email: email,
      password: password,
      role: role,
      manager_id: req.manager_id,
    });
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const [update] = await user.update({
      username,
      email,
      password,
      role,
      manager_id: req.manager_id,
    });

    if (update === 0) {
      return res.status(400).send('User not updated');
    }
    res.status(200).send('User updated');
    res.json(user);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Users.findByPk(id);

    if (!user) {
      return res.status(404).send('User not found');
    }

    const deleted = await user.destroy();
    if (deleted === 0) {
      return res.status(400).send('User not deleted');
    }
    res.status(200).send('User deleted');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ msg: 'Internal server error' });
  }
};
export default { getAllEmployees, addEmployee };
