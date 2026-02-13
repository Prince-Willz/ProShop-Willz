import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // false on localhost
    sameSite: 'lax', // IMPORTANT for localhost
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  // Also return the token so controllers can include it in JSON responses
  return token;
};

export default generateToken;
