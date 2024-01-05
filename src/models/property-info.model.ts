// src/models/user.model.ts

import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IPropertyInfo extends Document {
  uuid: string;
  streetAddress: string;
  city: string;
  zipCode: string
  subDivision: string
  createdAt: Date;
  updatedAt: Date | null;
}

const PropertyInfo = new Schema<IPropertyInfo>({
  uuid: { type: String, default: uuidv4, unique: true },
  streetAddress: { type: String },
  city: { type: String },
  zipCode: { type: String },
  subDivision: { type: String },
  createdAt: { type: Date, default: Date.now }, // Default createdAt to current date and time
  updatedAt: { type: Date, default: null }, // Optional updatedAt field
});

export default mongoose.model<IPropertyInfo>('PropertyInfo', PropertyInfo);
