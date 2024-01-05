// src/services/propertyInfo.service.ts

import { Request } from 'express';
import { PropertyInfo, IPropertyInfo } from '../models'; // Import models from the index file
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new propertyInfo based on the data provided in the request body.
 * @param req The Express request object containing propertyInfo data.
 * @returns A promise that resolves to the created propertyInfo.
 */
async function createPropertyInfo(req: Request): Promise<IPropertyInfo | null> {
  try {
    const propertyInfo = await PropertyInfo.create(req.body);
    if (propertyInfo) {
      return propertyInfo;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
async function findAllPropertyInfo(
  req: Request
): Promise<IPropertyInfo[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};
    const { results, total } = await paginateResults<IPropertyInfo>(
      PropertyInfo,
      {
        page,
        limit,
        order: 'createdAt',
        filters,
      }
    );

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
async function getPropertyInfoById(id: string): Promise<IPropertyInfo | null> {
  try {
    const propertyInfo = await PropertyInfo.findOne({ uuid: id });
    return propertyInfo;
  } catch (error) {
    throw error;
  }
}
async function propertyInfoUpdate(req: Request): Promise<IPropertyInfo | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { id } = req.params;
    const propertyInfo = await PropertyInfo.findOneAndUpdate(
      { uuid: id },
      data,
      { new: true }
    );
    return propertyInfo;
  } catch (error) {
    throw error;
  }
}
async function deletePropertyInfo(id: string): Promise<string | null> {
  try {
    const propertyInfo = await PropertyInfo.deleteOne({ uuid: id });
    if (propertyInfo.deletedCount === 1) {
      return 'propertyInfo deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createPropertyInfo,
  findAllPropertyInfo,
  getPropertyInfoById,
  propertyInfoUpdate,
  deletePropertyInfo,
};
