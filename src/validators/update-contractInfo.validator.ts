// src/validators/contact.validator.ts

const Joi = require('joi');

const updateContactInfoValidation = Joi.object({

  transactionSide: Joi.string().trim(),
  clientName: Joi.string().trim(),
  contactRatifiedDate: Joi.string().trim(),
  closingDate: Joi.string().trim(),
  earnestMoneyDueByDate: Joi.string().trim(),
  dueDiligenceExpiration: Joi.string().trim(),
  partyResponsibleToOrderCL100TermiteInspection: Joi.string().trim(),
  cL100TermiteInspectionReportDueDate: Joi.string().trim(),
  partyResponsibleToOrderHomeWarranty: Joi.string().trim(),
});

export default updateContactInfoValidation;
