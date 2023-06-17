import mongoose from 'mongoose';

// establish db connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connected to database: ' + conn.connection.host);
  } catch (error) {
    console.log('database connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;
