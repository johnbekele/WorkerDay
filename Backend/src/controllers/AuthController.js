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
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 360000,
  });

  // Save refresh token to database
  try {
    const [updated] = await Users.update(
      { refereshToken: refreshToken },
      { where: { email: email } }
    );

    if (updated === 0) {
      console.error('Update failed: No rows affected');
      return res.status(400).json({ msg: 'Error saving refresh token' });
    }
  } catch (error) {
    console.error('Update error:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }

  // Return JWT tokens
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

const logout = (req, res) => {
  // delete JWT token from the cookie
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // secure flag matches the enviroment
    sameSite: 'none',
  });
  res.json({ msg: 'Logged out' });
};

export default { login, logout };
