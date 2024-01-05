// src/validators/login.validator.ts

const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

export default loginValidation;
