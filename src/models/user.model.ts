// src/models/user.model.ts

import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  uuid: string;
  firstName: string;
  lastName: string;
  number: string;
  state: string;
  business: string;
  email: string;
  password: string;
  token: string;
  authType: string;
  role: string;
  isVerify: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

const User = new Schema<IUser>({
  uuid: { type: String, default: uuidv4, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  number: { type: String },
  state: { type: String },
  business: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String },
  isVerify: { type: Boolean, default: false },
  authType: { type: String, enum: ['google', 'facebook', null], default: null },
  role: { type: String, enum: ['admin', 'agent'] },
  createdAt: { type: Date, default: Date.now }, // Default createdAt to current date and time
  updatedAt: { type: Date, default: null }, // Optional updatedAt field
});

export default mongoose.model<IUser>('User', User);
