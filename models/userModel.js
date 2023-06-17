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

// password hashing
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//encypt password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;
