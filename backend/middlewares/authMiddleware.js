import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import { ADMIN_ID_ROLE } from '../lib/constants.js';

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.cggd_token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await db.query('SELECT * FROM users WHERE id = ?', [
        decoded.userId,
      ]);
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user[0][0].role_id == ADMIN_ID_ROLE) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
});

export { authenticate, authorizeAdmin };
