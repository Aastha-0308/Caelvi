import mongoose from 'mongoose';
import { MONGO_URI } from '../config.js';

function connectDB() {
  return mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('MongoDB Connected');
    })
    .catch((err) => {
      console.error('MongoDB Error:', err);
      process.exit(1);
    });
}

export { connectDB };