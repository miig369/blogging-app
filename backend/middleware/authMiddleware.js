import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// check if the token exists and verify the token
// when a user is logged they are granted a token
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // check if token start with bearer and a space
  // if token exists match it to the user
  // API TESING OIN POSTMAN - Headers -> key - Authorization -> Value - Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    console.log('token trace', req.headers.authorization);

    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      console.log('token: ', error);
      res.status(401);
      throw new Error('Not Authorised');
    }
  } else if (!token) {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

export default protect;
