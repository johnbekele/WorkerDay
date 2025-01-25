import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Missing or invalid token', authHeader });
  }
  // Get token from header and dlete the space from Bearer token
  const token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error('JWT Verification failed:', err.message);
      return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = decoded.user;
    next();
  });
};

export default verifyJWT;
