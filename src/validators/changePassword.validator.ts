// src/validators/login.validator.ts

const Joi = require('joi');

const changePasswordValidation = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().required(),
});

export default changePasswordValidation;
