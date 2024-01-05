// src/services/contractInfo.service.ts

import { Request } from 'express';
import { Contract, IContract } from '../models'; // Import models from the index file
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new ContractInfo based on the data provided in the request body.
 * @param req The Express request object containing ContractInfo data.
 * @returns A promise that resolves to the created ContractInfo.
 */
async function createContractInfo(req: Request): Promise<IContract | null> {
  try {
    const contractInfo = await Contract.create(req.body);
    if (contractInfo) {
      return contractInfo;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
async function findAllContractInfo(req: Request): Promise<IContract[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};
    const { results, total } = await paginateResults<IContract>(Contract, {
      page,
      limit,
      order: 'createdAt',
      filters,
    });
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
async function getContractInfoById(id: string): Promise<IContract | null> {
  try {
    const contractInfo = await Contract.findOne({ uuid: id });
    return contractInfo;
  } catch (error) {
    throw error;
  }
}
async function contractInfoUpdate(req: Request): Promise<IContract | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { id } = req.params;
    const contractInfo = await Contract.findOneAndUpdate({ uuid: id }, data, {
      new: true,
    });
    return contractInfo;
  } catch (error) {
    throw error;
  }
}
async function deleteContractInfo(id: string): Promise<string | null> {
  try {
    const contractInfo = await Contract.deleteOne({ uuid: id });
    if (contractInfo.deletedCount === 1) {
      return 'contractInfo deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createContractInfo,
  findAllContractInfo,
  getContractInfoById,
  contractInfoUpdate,
  deleteContractInfo,
};
