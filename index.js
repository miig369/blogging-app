import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';
import userRoutes from './routes/userRoutes.js';
import articlesRoutes from './routes/articleRoutes.js';

const PORT = 9000;
dotenv.config();
connectDB();

//middleware
const app = express();
app.use(express.json());

//routes
app.use('/api/users', userRoutes);
app.use('/api/articles', articlesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //   connectDB();
});
