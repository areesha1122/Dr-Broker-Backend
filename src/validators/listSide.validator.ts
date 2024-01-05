// src/validators/checklist.validator.ts

import Joi from 'joi';
import { CHECKLIST_LISTSIDE_DOCUMENT } from '../utils/check-list-side-enum'; // Import your enum

// Generate a dynamic validation schema for the enum keys
const dynamicSchema: Record<string, Joi.BooleanSchema> = {};

for (const key in CHECKLIST_LISTSIDE_DOCUMENT) {
  dynamicSchema[key] = Joi.boolean();
}

const checklistValidation = Joi.object({
  ...dynamicSchema, // Include the dynamic schema for enum keys
  createdAt: Joi.date().iso(),
  updatedAt: Joi.date().iso(),
  inspectorName: Joi.string(),
  inspectionDateTime: Joi.date().iso(),
  cL100TermiteInspectorName: Joi.string(),
  cL100TermiteInspectionDateTime: Joi.date().iso(),
  electric: Joi.string(),
  gas: Joi.string(),
  water: Joi.string(),
  sewer: Joi.string(),
  internet: Joi.string()
});

export default checklistValidation;
