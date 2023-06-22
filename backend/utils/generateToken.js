import jwt from 'jsonwebtoken';

// protect then user throughout the site
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
