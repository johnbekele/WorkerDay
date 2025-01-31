import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Users from '../models/User.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const AddUser = async (req, res) => {
  try {
    const {
      username,
      surname,
      email,
      phone,
      address,
      otherDetails,
      password,
      role,
      manager_email,
    } = req.body;

    // Validate required fields
    if (!username || !surname || !email || !password || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Normalize email and role
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedRole =
      role.trim().charAt(0).toUpperCase() + role.slice(1).toLowerCase();

    // Check if user already exists
    const userExists = await Users.findOne({
      where: { email: normalizedEmail },
    });
    if (userExists) {
      return res.status(409).json({ message: 'User already exists' });
    }

    let manager_id = null; // Default to null

    // Assign a manager if the user is an employee
    if (normalizedRole === 'Employee' && manager_email) {
      const manager = await Users.findOne({
        where: { role: 'Manager', email: manager_email.toLowerCase() },
      });

      if (!manager) {
        return res
          .status(404)
          .json({ message: 'No manager found with this email' });
      }

      manager_id = manager.id;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await Users.create({
      name: username,
      surname: surname,
      email: normalizedEmail,
      phone: phone || null, // Default to null if not provided
      address: address || null,
      otherDetails: otherDetails || null,
      password: hashedPassword,
      role: normalizedRole,
      manager_id: manager_id,
    });

    console.log('New user created:', newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export default AddUser;
