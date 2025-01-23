import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import Users from '../models/User.js';

const app = express();

const login = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  const userExists = await Users.findOne({
    where: {
      email: email,
      name: username,
    },
  });

  if (!userExists) return res.status(400).json({ msg: 'User does not exist' });

  // Validate password

  const isMatch = await bcrypt.compare(password, userExists.password);

  if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

  // JWT Payload
  const payload = {
    user: {
      id: userExists.id,
      username: userExists.name,
      email: userExists.email,
      role: userExists.role,
    },
  };

  // Sign token
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 360000,
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 360000,
  });

  // Save refresh token to database
  const [update] = await Users.update(
    { refreshToken: refreshToken },
    { where: { email: email } }
  );

  if (update === 0) {
    return res.status(400).json({ msg: 'Error saving refresh token' });
  }
  accessToken;
  // Return JWT tokens
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

export default login;
