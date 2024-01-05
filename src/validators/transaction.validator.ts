// src/validators/transaction.validator.ts

const Joi = require('joi');

const transactionValidation = Joi.object({
  ChecklistListSide: Joi.string(),
  ChecklistBuySide: Joi.string(),
  ChecklistBothSide: Joi.string(),
  userId: Joi.string(),
  propertyInfo: Joi.string(),
  contractInfo: Joi.string(),
  contactInfo: Joi.string(),
  transactionStatus: Joi.boolean()
});

export default transactionValidation;