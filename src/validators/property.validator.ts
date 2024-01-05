// src/validators/property.validator.ts

const Joi = require('joi');

const propertyInfoValidation = Joi.object({
  streetAddress: Joi.string().trim().required(),
  city: Joi.string().trim(),
  zipCode: Joi.string().trim(),
  subDivision: Joi.string().trim(),

});

export default propertyInfoValidation;
