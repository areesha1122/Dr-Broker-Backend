// src/services/transaction.service.ts

import { Request } from 'express';
import {
  Contact,
  PropertyInfo,
  ChecklistListSide,
  ChecklistBuySide,
  Contract,
  ChecklistBothSide,
  Transaction,
  ITransaction,
} from '../models';
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new transaction based on the data provided in the request body.
 * @param req The Express request object containing transaction data.
 * @returns A promise that resolves to the created transaction.
 */
async function createTransaction(req: Request): Promise<ITransaction | null> {
  try {
    const checklistListSideId = await ChecklistListSide.findOne(
      { uuid: req.body.ChecklistListSide },
      '_id'
    );
    const checklistBuySideId = await ChecklistBuySide.findOne(
      { uuid: req.body.ChecklistBuySide },
      '_id'
    );
    const checklistBothSideId = await ChecklistBothSide.findOne(
      { uuid: req.body.ChecklistBothSide },
      '_id'
    );
    const propertyInfoId = await PropertyInfo.findOne(
      { uuid: req.body.propertyInfo },
      '_id'
    );
    const contractInfoId = await Contract.findOne(
      { uuid: req.body.contractInfo },
      '_id'
    );
    const contactInfoId = await Contact.findOne(
      { uuid: req.body.contactInfo },
      '_id'
    );

    const transactionData = {
      ChecklistListSide: checklistListSideId?._id,
      ChecklistBuySide: checklistBuySideId?._id,
      ChecklistBothSide: checklistBothSideId?._id,
      userId: req.body.userId,
      propertyInfo: propertyInfoId?._id,
      contractInfo: contractInfoId?._id,
      contactInfo: contactInfoId?._id,
    };

    const transaction = await Transaction.create(transactionData);

    if (transaction) {
      return transaction;
    }

    return null;
  } catch (error) {
    throw error;
  }
}

async function findAllTransaction(req: Request): Promise<ITransaction[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    if (!req.params.id) null;
    const filters = req.body.filter || {};
    filters.userId = req.params.id;
    const { results, total } = await paginateResults<ITransaction>(
      Transaction,
      {
        page,
        limit,
        order: 'createdAt',
        filters,
        excludeFields: ['_id'],
      }
    );
    await Transaction.populate(results, [
      { path: 'propertyInfo', model: 'PropertyInfo', select: '-_id' },
      { path: 'contractInfo', model: 'Contact', select: '-_id' },
      { path: 'contactInfo', model: 'ContactInfo', select: '-_id' },
      { path: 'ChecklistListSide', model: 'ChecklistListSide', select: '-_id' },
      { path: 'ChecklistBuySide', model: 'ChecklistBuySide', select: '-_id' },
      { path: 'ChecklistBothSide', model: 'ChecklistBothSide', select: '-_id' },
    ]);
    return {
      page,
      limit,
      total,
      results,
    };
  } catch (error) {
    throw error;
  }
}
async function getTransactionById(id: string): Promise<ITransaction | null> {
  try {
    const transaction = await Transaction.findOne({ uuid: id });
    await Transaction.populate(transaction, [
      { path: 'propertyInfo', model: 'PropertyInfo', select: '-_id' },
      { path: 'contract', model: 'Contract', select: '-_id' },
      { path: 'contact', model: 'Contact', select: '-_id' },
      { path: 'ChecklistListSide', model: 'ChecklistListSide', select: '-_id' },
      { path: 'ChecklistBuySide', model: 'ChecklistBuySide', select: '-_id' },
      { path: 'ChecklistBothSide', model: 'ChecklistBothSide', select: '-_id' },
    ]);
    return transaction;
  } catch (error) {
    throw error;
  }
}
async function transactionUpdate(req: Request): Promise<ITransaction | null> {
  try {
    const { id } = req.params;
    const findModelId = async (model: any, field: any) => {
      if (req.body[field]) {
        const foundModel = await model.findOne(
          { uuid: req.body[field] },
          '_id'
        );
        return foundModel?._id;
      }
      return undefined;
    };
    const checklistListSideId = await findModelId(
      ChecklistListSide,
      'ChecklistListSide'
    );
    const checklistBuySideId = await findModelId(
      ChecklistBuySide,
      'ChecklistBuySide'
    );
    const checklistBothSideId = await findModelId(
      ChecklistBothSide,
      'ChecklistBothSide'
    );
    const propertyInfoId = await findModelId(PropertyInfo, 'propertyInfo');
    const contractInfoId = await findModelId(Contract, 'contractInfo');
    const contactInfoId = await findModelId(Contact, 'contactInfo');
    const updatedTransactionData = {
      ChecklistListSide: checklistListSideId,
      ChecklistBuySide: checklistBuySideId,
      ChecklistBothSide: checklistBothSideId,
      userId: req.body.userId,
      propertyInfo: propertyInfoId,
      contractInfo: contractInfoId,
      contactInfo: contactInfoId,
      updatedAt: Date.now(),
    };
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { uuid: id },
      updatedTransactionData,
      {
        new: true,
      }
    );

    return updatedTransaction;
  } catch (error) {
    throw error;
  }
}

async function deleteTransaction(id: string): Promise<string | null> {
  try {
    const transaction = await Transaction.deleteOne({ uuid: id });
    if (transaction.deletedCount === 1) {
      return 'transaction deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createTransaction,
  findAllTransaction,
  getTransactionById,
  transactionUpdate,
  deleteTransaction,
};
