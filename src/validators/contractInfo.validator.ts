// src/validators/contact.validator.ts

const Joi = require('joi');

const contactInfoValidation = Joi.object({
  transactionSide: Joi.string().trim().required(),
  clientName: Joi.string().trim().required(),
  contactRatifiedDate: Joi.string().trim().required(),
  closingDate: Joi.string().trim().required(),
  earnestMoneyDueByDate: Joi.string().trim().required(),
  dueDiligenceExpiration: Joi.string().trim(),
  partyResponsibleToOrderCL100TermiteInspection: Joi.string().trim(),
  cL100TermiteInspectionReportDueDate: Joi.string().trim(),
  partyResponsibleToOrderHomeWarranty: Joi.string().trim(),
});

export default contactInfoValidation;
