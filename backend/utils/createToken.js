import jwt from 'jsonwebtoken';
import {
  EXPIRES_IN,
  COOKIE_NAME,
  SAME_SITE,
  MAX_AGE,
} from '../lib/constants.js';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });

  res.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: SAME_SITE,
    maxAge: MAX_AGE,
  });

  return token;
};

export default generateToken;
