// src/services/bothSide.service.ts

import { Request } from 'express';
import { ChecklistBothSide, IChecklistBothSide } from '../models'; // Import models from the index file
import { mapChecklistBothSideData } from '../utils/map-checklist-data';
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new bothSide based on the data provided in the request body.
 * @param req The Express request object containing bothSide data.
 * @returns A promise that resolves to the created bothSide.
 */
async function createBothSide(
  req: Request
): Promise<IChecklistBothSide | null> {
  try {
    const mappedData = mapChecklistBothSideData(req.body);
    const bothSide = await ChecklistBothSide.create(mappedData);
    return bothSide;
  } catch (error) {
    throw error;
  }
}
async function findAllBothSide(
  req: Request
): Promise<IChecklistBothSide[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};
    const { results, total } = await paginateResults<IChecklistBothSide>(
      ChecklistBothSide,
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
async function getBothSideById(
  listId: string
): Promise<IChecklistBothSide | null> {
  try {
    const bothSide = await ChecklistBothSide.findOne({ uuid: listId });
    return bothSide;
  } catch (error) {
    throw error;
  }
}
async function bothSideUpdate(
  req: Request
): Promise<IChecklistBothSide | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { listId } = req.params;
    const mappedData = mapChecklistBothSideData(data);
    const bothSide = await ChecklistBothSide.findOneAndUpdate(
      { uuid: listId },
      mappedData,
      { new: true }
    );
    return bothSide;
  } catch (error) {
    throw error;
  }
}
async function deleteBothSide(listId: string): Promise<string | null> {
  try {
    const bothSide = await ChecklistBothSide.deleteOne({ uuid: listId });
    if (bothSide.deletedCount === 1) {
      return 'bothSide deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createBothSide,
  findAllBothSide,
  getBothSideById,
  bothSideUpdate,
  deleteBothSide,
};
