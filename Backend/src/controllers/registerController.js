import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Users from '../models/User.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const AddUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);

  if (!username || !email || !password || !role)
    return res.status(400).send('All fields are required');
  const userExists = await Users.findOne({
    where: {
      email: email,
      name: username,
    },
  });
  if (userExists) return res.status(409).send('User already exists');

  // Hash the password
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    name: username,
    email: email,
    password: hashedPassword,
    role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase(),
  };
  try {
    const result = await Users.create(newUser);
    console.log(result);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error);
  }

  res.status(201).send('User registered successfully');
};

export default AddUser;
