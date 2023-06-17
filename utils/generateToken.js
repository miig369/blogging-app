import jwt from 'jsonwebtoken';

// protect then user throughout the site
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expired: '30d' });
};

export default generateToken;
