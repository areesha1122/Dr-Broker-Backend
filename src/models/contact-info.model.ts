// src/models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IContract extends Document {
  uuid: string;
  transactionSide: string;
  clientName: string;
  contactRatifiedDate: string;
  closingDate: string;
  earnestMoneyDueByDate: string;
  dueDiligenceExpiration: string;
  partyResponsibleToOrderCL100TermiteInspection: string;
  cL100TermiteInspectionReportDueDate: string;
  partyResponsibleToOrderHomeWarranty: string;
  createdAt: Date;
  updatedAt: Date | null;
}

const Contract = new Schema<IContract>({
  uuid: { type: String, default: uuidv4, unique: true },
  transactionSide: { type: String },
  clientName: { type: String },
  contactRatifiedDate: { type: String },
  closingDate: { type: String },
  earnestMoneyDueByDate: { type: String },
  dueDiligenceExpiration: { type: String },
  partyResponsibleToOrderCL100TermiteInspection: { type: String },
  cL100TermiteInspectionReportDueDate: { type: String },
  partyResponsibleToOrderHomeWarranty: { type: String },
  createdAt: { type: Date, default: Date.now }, // Default createdAt to current date and time
  updatedAt: { type: Date, default: null }, // Optional updatedAt field
});

export default mongoose.model<IContract>('Contract', Contract);
