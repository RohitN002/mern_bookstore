
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config();
const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;
const mongoDBURL = process.env.mongoDBURL
// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY

app.use(cors());
// Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });``