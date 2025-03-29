import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize'; // Import Op for OR queries
import Users from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const getMe = async (req, res) => {
  try {
    // Since the middleware already verified the token and set req.user
    res.json(req.user);
  } catch (error) {
    console.error('❌ Error in getMe:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

const login = async (req, res) => {
  const { identifier, password } = req.body; // `identifier` can be email or username

  console.log(`🔹 Received login request:`, { identifier, password }); // Debugging

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ msg: 'Please enter username/email and password' });
  }

  try {
    // Find user by either email or username
    const userExists = await Users.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { name: identifier }],
      },
      raw: true, // Get raw data only
    });

    console.log(`🔹 Found user:`, userExists); // Debugging

    if (!userExists) {
      return res.status(404).json({ msg: 'User does not exist' }); // Use 404 for missing user
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    // JWT Payload
    const payload = {
      user: {
        id: userExists.id,
        username: userExists.name,
        email: userExists.email,
        role: userExists.role,
      },
    };

    // Ensure secret keys exist
    if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
      console.error('❌ Missing JWT secrets in environment variables!');
      return res
        .status(500)
        .json({ msg: 'Server misconfiguration: Missing JWT secrets' });
    }

    // Generate JWT tokens
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '15m',
    });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '7d',
    });

    // Save refresh token to the database
    const [updated] = await Users.update(
      { refreshToken },
      { where: { id: userExists.id } }
    );

    if (updated === 0) {
      console.error(
        '❌ Update failed: No rows affected. User ID:',
        userExists.id
      );
      return res.status(500).json({ msg: 'Error saving refresh token' });
    }

    // Set refresh token in cookies
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.json({ accessToken, role: userExists.role });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
  });
  res.json({ msg: 'Logged out' });
};

export default { login, logout, getMe };
