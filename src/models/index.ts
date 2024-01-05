// src/models/index.ts

import mongoose from 'mongoose';
import User, { IUser } from './user.model';
import Contract, { IContract } from './contact-info.model';
import Contact, { IContact } from './checkList-contract.model';
import PropertyInfo, { IPropertyInfo } from './property-info.model';
import ChecklistListSide, {
  IChecklistListSide,
} from './checkList-listSide.model';
import ChecklistBuySide, { IChecklistBuySide } from './checkList-buySide.model';

import ChecklistBothSide, {
  IChecklistBothSide,
} from './checkList-bothSide.model';
import Transaction, { ITransaction } from './transaction.model';

export {
  mongoose, // You can export mongoose if needed
  User,
  IUser, // Export the User model
  Contact,
  IContact,
  PropertyInfo,
  IPropertyInfo,
  IChecklistListSide,
  ChecklistListSide,
  ChecklistBuySide,
  IChecklistBuySide,
  Contract,
  IContract,
  ChecklistBothSide,
  IChecklistBothSide,
  Transaction,
  ITransaction,
};
