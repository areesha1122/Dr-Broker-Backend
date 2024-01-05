// src/validators/contact.validator.ts
import Joi from 'joi';

const contactValidation = Joi.object({
  titleOrAttorneyCompanyName: Joi.string().trim(),
  titleOrAttorneyCompanyLocation: Joi.string().trim(),
  titleOrAttorneyCompanyContactName: Joi.string().trim(),
  titleOrAttorneyCompanyPhone: Joi.string().trim(),
  titleOrAttorneyCompanyEmail: Joi.string().trim().email(),
  agentName: Joi.string().trim(),
  agentPhone: Joi.string().trim(),
  agentEmail: Joi.string().trim().email(),
  coordinatorName: Joi.string().trim(),
  coordinatorPhone: Joi.string().trim(),
  coordinatorEmail: Joi.string().trim().email(),
  client1Name: Joi.string().trim(),
  client1Phone: Joi.string().trim(),
  client1Email: Joi.string().trim().email(),
  client2Name: Joi.string().trim(),
  client2Phone: Joi.string().trim(),
  client2Email: Joi.string().trim().email(),
  contactSide: Joi.string().valid('listSide', 'buySide')
});

export default contactValidation;
