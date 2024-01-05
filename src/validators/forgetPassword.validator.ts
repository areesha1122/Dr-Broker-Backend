// src/validators/login.validator.ts

const Joi = require('joi');

const forgetPasswordValidation = Joi.object({
  email: Joi.string().email().required(),
});

export default forgetPasswordValidation;
