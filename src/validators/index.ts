// src/validators/index.ts

import register from './register.validator';
import login from './login.validator';
import forgetPassword from './forgetPassword.validator';
import resetPassword from './resetPassword.validator';
import changePassword from './changePassword.validator';
import socialAuth from './social.auth.validator';
import listSide from './listSide.validator';
import property from './property.validator';
import contractInfo from './contractInfo.validator';
import updateProperty from './update-property.validator';
import updateContractInfo from './update-contractInfo.validator';
import buySide from './buySide.validator';
import checkListContact from './checkList-conatctInfo.validator';
import bothSide from './bothSide.validator';
import transaction from './transaction.validator';

export {
  register,
  login,
  forgetPassword,
  resetPassword,
  changePassword,
  socialAuth,
  listSide,
  property,
  contractInfo,
  updateProperty,
  updateContractInfo,
  buySide,
  checkListContact,
  bothSide,
  transaction,
};
