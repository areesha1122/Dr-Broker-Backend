// src/validators/property.validator.ts

const Joi = require('joi');

const updatePropertyInfoValidation = Joi.object({
  streetAddress: Joi.string().trim(),
  city: Joi.string().trim(),
  zipCode: Joi.string().trim(),
  subDivision: Joi.string().trim(),
});

export default updatePropertyInfoValidation;
