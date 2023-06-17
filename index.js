import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/connectDB.js';

const PORT = 9000;
dotenv.config();
connectDB();

//middleware
const app = express();
app.use(express.json());

//routes
app.use('/', (req, res) => {
  res.send('Hello world, agian');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  //   connectDB();
});
