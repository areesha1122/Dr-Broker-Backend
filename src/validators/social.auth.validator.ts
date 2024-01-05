// src/validators/googleAuth.validator.ts

const Joi = require('joi');

const socialAuthValidation = Joi.object({
  authType: Joi.string().trim().required(),
  email: Joi.string().email().required(),
  role: Joi.string().trim().required(),

});

export default socialAuthValidation;
