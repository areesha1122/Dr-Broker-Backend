import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITransaction extends Document {
  uuid: string;
  ChecklistListSide: mongoose.Types.ObjectId;
  ChecklistBuySide: mongoose.Types.ObjectId;
  ChecklistBothSide: mongoose.Types.ObjectId;
  userId: string;
  propertyInfo: mongoose.Types.ObjectId;
  contractInfo: mongoose.Types.ObjectId;
  contactInfo: mongoose.Types.ObjectId;
  transactionStatus: boolean;
  createdAt: Date;
  updatedAt: Date | null;
}

const Transaction = new Schema<ITransaction>({
  uuid: { type: String, default: uuidv4, unique: true },
  ChecklistListSide: { type: Schema.Types.ObjectId, ref: 'ChecklistListSide' },
  ChecklistBuySide: { type: Schema.Types.ObjectId, ref: 'ChecklistBuySide' },
  ChecklistBothSide: { type: Schema.Types.ObjectId, ref: 'ChecklistBothSide' },
  userId: { type: String },
  propertyInfo: { type: Schema.Types.ObjectId, ref: 'PropertyInfo' },
  contractInfo: { type: Schema.Types.ObjectId, ref: 'Contract' },
  contactInfo: { type: Schema.Types.ObjectId, ref: 'Contact' },
  transactionStatus: { type: Boolean, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: null },
});

export default mongoose.model<ITransaction>('Transaction', Transaction);
