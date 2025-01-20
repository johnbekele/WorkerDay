import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Users from '../models/User.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const AddUser = async (req, res) => {
  const { username, email, password, role, manager_email } = req.body;
  console.log(req.body);

  //check filled input
  if (!username || !email || !password || !role)
    return res.status(400).send('All fields are required');
  const userExists = await Users.findOne({
    where: {
      email: email,
      name: username,
    },
  });
  //check if user exists
  if (userExists) return res.status(409).send('User already exists');
  const isEmplooyee = role.toLowerCase() === 'employee';

  let manager_id; // Declare manager_id variable
  //check if the new user is employee
  if (isEmplooyee) {
    const manager = await Users.findOne({
      where: {
        role: 'Manager',
        email: manager_email.toLowerCase(),
      },
    });
    if (!manager)
      return res.status(404).send('No manager found to assign employee');
    manager_id = manager.id;
  } else {
    manager_id = null;
  }

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    name: username,
    email: email,
    password: hashedPassword,
    role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
    manager_id: manager_id,
  };
  try {
    const result = await Users.create(newUser);
    console.log(result);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error);
  }
};

export default AddUser;
