// src/services/buySide.service.ts

import { Request } from 'express';
import { ChecklistBuySide, IChecklistBuySide } from '../models'; // Import models from the index file
import { mapChecklistBuySideData } from '../utils/map-checklist-data';
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new buySide based on the data provided in the request body.
 * @param req The Express request object containing buySide data.
 * @returns A promise that resolves to the created buySide.
 */
async function createBuySide(req: Request): Promise<IChecklistBuySide | null> {
  try {
    const mappedData = mapChecklistBuySideData(req.body);
    const buySide = await ChecklistBuySide.create(mappedData);
    return buySide;
  } catch (error) {
    throw error;
  }
}
async function findAllBuySide(
  req: Request
): Promise<IChecklistBuySide[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};
    const { results, total } = await paginateResults<IChecklistBuySide>(
      ChecklistBuySide,
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
async function getBuySideById(
  listId: string
): Promise<IChecklistBuySide | null> {
  try {
    const buySide = await ChecklistBuySide.findOne({ uuid: listId });
    return buySide;
  } catch (error) {
    throw error;
  }
}
async function buySideUpdate(req: Request): Promise<IChecklistBuySide | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { listId } = req.params;
    const mappedData = mapChecklistBuySideData(data);
    const buySide = await ChecklistBuySide.findOneAndUpdate(
      { uuid: listId },
      mappedData,
      { new: true }
    );
    return buySide;
  } catch (error) {
    throw error;
  }
}
async function deleteBuySide(listId: string): Promise<string | null> {
  try {
    const buySide = await ChecklistBuySide.deleteOne({ uuid: listId });
    if (buySide.deletedCount === 1) {
      return 'buySide deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createBuySide,
  findAllBuySide,
  getBuySideById,
  buySideUpdate,
  deleteBuySide,
};
