// src/validators/login.validator.ts

const Joi = require('joi');

const resetPasswordValidation = Joi.object({
  password: Joi.string().required(),
});

export default resetPasswordValidation;
