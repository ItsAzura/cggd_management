import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.cookie('cggd_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'strict',
    maxAge: 3600000,
  });

  return token;
};

export default generateToken;
