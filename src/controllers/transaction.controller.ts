// src/controllers/transaction.controller.ts

import { Request, Response } from 'express';
import { transactionService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createTransaction(req: Request, res: Response) {
  try {
    const transaction = await transactionService.createTransaction(req);
    transaction != null && logger.info(MESSAGES.TRANSACTION_CREATED);
    return res
      .status(transaction === null ? StatusCodes.CONFLICT : StatusCodes.CREATED)
      .json(
        transaction === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.TRANSACTION_NOT_CREATED,
              transaction: transaction,
            }
          : {
              message: MESSAGES.TRANSACTION_CREATED,
              transaction: transaction,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_TRANSACTION, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllTransaction(req: Request, res: Response) {
  try {
    const transaction = await transactionService.findAllTransaction(req);
    return res.json(transaction);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_TRANSACTIONS, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getTransactionById(req: Request, res: Response) {
  try {
    const transaction = await transactionService.getTransactionById(
      req.params.id
    );

    if (!transaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.TRANSACTION_NOT_FOUND });
    }
    return res.json(transaction);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_TRANSACTION, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function transactionUpdate(req: Request, res: Response) {
  try {
    const transaction = await transactionService.transactionUpdate(req);
    if (!transaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.TRANSACTION_NOT_FOUND });
    }
    return res.json(transaction);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_TRANSACTION, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deleteTransaction(req: Request, res: Response) {
  try {
    const transaction = await transactionService.deleteTransaction(
      req.params.id
    );
    if (!transaction) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.TRANSACTION_NOT_FOUND });
    }
    return res.json(transaction);
  } catch (error) {
    console.error(MESSAGES.ERROR_DELETING_TRANSACTION, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createTransaction,
  findAllTransaction,
  getTransactionById,
  transactionUpdate,
  deleteTransaction,
};
