// src/db.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as mongoose.ConnectOptions
    );
    console.log('👉 Database connected successfully');
  } catch (err) {
    console.error('☠️ MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
