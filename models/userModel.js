import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 32,
  },
  lastName: {
    type: String,
    required: true,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    min: 6,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

export default User;
