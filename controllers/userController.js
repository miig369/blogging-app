import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// signup user -> post route -> api/users/
const signUp = asyncHandler(async (req, res) => {
  // destructure data from the request body
  const { firstName, lastName, email, password } = req.body;

  //check if the user is already registered
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // create new user
  const user = await User.create({ firstName, lastName, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.ud),
    });
  } else {
    res.status(400);
    throw new Error('User could not be created');
  }
});

// login -> post route -> api/users/
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find the user in the db
  const user = await User.findOne({ email });

  if (user && user.matchPassword(password)) {
    return res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(404);
    throw new Error('invalid email or password');
  }
});

// get all users -> route get -> api/users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// get user by id -> route get -> api/users/:id
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).isSelected('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('user not found');
  }
});

// update user -> route put -> api/users/:id
const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;

    //update the user data
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
    });
  } else {
    res.status(401);
    throw new Error('User could not be updated');
  }
});

// delete user -> route delete -> api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: 'User Deleted' });
  } else {
    res.status(401);
    throw new Error('user not deleted');
  }
});

export { signUp, login, getUsers, getUserById, updateUserById, deleteUser };
