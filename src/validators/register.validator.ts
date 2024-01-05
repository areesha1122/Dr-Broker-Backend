// src/validators/register.validator.ts

const Joi = require('joi');

const registerValidation = Joi.object({
  firstName: Joi.string().trim().max(50).required(),
  lastName: Joi.string().trim().max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  number: Joi.string().required(),
  role: Joi.string().required(),
  state: Joi.string().required(),
  business: Joi.string(),
});

export default registerValidation;
