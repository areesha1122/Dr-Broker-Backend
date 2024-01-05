// src/models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IContact extends Document {
  uuid: string;
  titleOrAttorneyCompanyName: string;
  titleOrAttorneyCompanyLocation: string;
  titleOrAttorneyCompanyContactName: string;
  titleOrAttorneyCompanyPhone: string;
  titleOrAttorneyCompanyEmail: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  coordinatorName: string;
  coordinatorPhone: string;
  coordinatorEmail: string;
  client1Name: string;
  client1Phone: string;
  client1Email: string;
  client2Name: string;
  client2Phone: string;
  client2Email: string;
  contactSide: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const Contact = new Schema<IContact>({
  uuid: { type: String, default: uuidv4, unique: true },
  titleOrAttorneyCompanyName: { type: String },
  titleOrAttorneyCompanyLocation: { type: String },
  titleOrAttorneyCompanyContactName: { type: String },
  titleOrAttorneyCompanyPhone: { type: String },
  titleOrAttorneyCompanyEmail: { type: String },
  agentName: { type: String },
  agentPhone: { type: String },
  agentEmail: { type: String },
  coordinatorName: { type: String },
  coordinatorPhone: { type: String },
  coordinatorEmail: { type: String },
  client1Name: { type: String },
  client1Phone: { type: String },
  client1Email: { type: String },
  client2Name: { type: String },
  client2Phone: { type: String },
  client2Email: { type: String },
  contactSide: { type: String, enum: ['listSide', 'buySide'] },
  createdAt: { type: Date, default: Date.now }, // Default createdAt to current date and time
  updatedAt: { type: Date, default: null }, // Optional updatedAt field
});

export default mongoose.model<IContact>('Contact', Contact);
