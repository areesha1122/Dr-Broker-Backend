import mongoose, { Document, Schema } from 'mongoose';
import { CHECKLIST_LISTSIDE_DOCUMENT } from '../utils/check-list-side-enum';
import { v4 as uuidv4 } from 'uuid';

// Create an interface that uses the enum values as keys with boolean values
export interface IChecklistListSide extends Document {
  uuid: string;
  key: boolean;
  createdAt: Date; // Add createdAt field
  updatedAt: Date; // Add updatedAt field
  inspectorName: string;
  inspectionDateTime: string;
  cL100TermiteInspectorName:string;
  cL100TermiteInspectionDateTime:string;
  electric:string;
  gas:string;
  water:string;
  sewer:string;
  internet:string;
}

const ChecklistListSideSchema = new Schema<IChecklistListSide>({
  // Initialize all checklist items to false by default
  uuid: { type: String, default: uuidv4, unique: true },
  ...Object.values(CHECKLIST_LISTSIDE_DOCUMENT).reduce((acc:any, key:string) => {
    acc[key] = { type: Boolean, default: null };
    return acc;
  }, {} as Record<string, { type: Boolean }>),
  createdAt: { type: Date, default: Date.now }, // Define createdAt field
  updatedAt: { type: Date, default: null }, // Define updatedAt field
  inspectorName: { type: String },
  inspectionDateTime: { type: String },
  cL100TermiteInspectorName:{ type: String },
  cL100TermiteInspectionDateTime:{ type: String },
  electric:{ type: String },
  gas:{ type: String },
  water:{ type: String },
  sewer:{ type: String },
  internet:{ type: String }
});

export default mongoose.model<IChecklistListSide>('ChecklistListSide', ChecklistListSideSchema);

