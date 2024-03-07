import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import parkingLotsRouter from './routes/parkingLots.route.js';
import parkingsRouter from './routes/parkings.route.js';
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB!");
}).catch((err) => {
  console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use('/api', parkingLotsRouter);
app.use('/api', parkingsRouter);
// app.use('/api', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    isSuccess: false,
    error: {
      reason: message,
    }
  });
});