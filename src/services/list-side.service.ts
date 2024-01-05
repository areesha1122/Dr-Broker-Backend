// src/services/listSide.service.ts

import { Request } from 'express';
import { ChecklistListSide, IChecklistListSide } from '../models'; // Import models from the index file
import { mapChecklistListSideData } from '../utils/map-checklist-data';
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new listSide based on the data provided in the request body.
 * @param req The Express request object containing listSide data.
 * @returns A promise that resolves to the created listSide.
 */
async function createListSide(
  req: Request
): Promise<IChecklistListSide | null> {
  try {
    const mappedData = mapChecklistListSideData(req.body);
    const listSide = await ChecklistListSide.create(mappedData);
    return listSide;
  } catch (error) {
    throw error;
  }
}
async function findAllListSide(
  req: Request
): Promise<IChecklistListSide[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};

    const { results, total } = await paginateResults<IChecklistListSide>(
      ChecklistListSide,
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
async function getListSideById(
  listId: string
): Promise<IChecklistListSide | null> {
  try {
    const listSide = await ChecklistListSide.findOne({
      uuid: listId,
    });
    return listSide;
  } catch (error) {
    throw error;
  }
}
async function listSideUpdate(
  req: Request
): Promise<IChecklistListSide | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { listId } = req.params;
    const mappedData = mapChecklistListSideData(data);
    const listSide = await ChecklistListSide.findOneAndUpdate(
      { uuid: listId },
      mappedData,
      { new: true }
    );
    return listSide;
  } catch (error) {
    throw error;
  }
}
async function deleteListSide(listId: string): Promise<string | null> {
  try {
    const listSide = await ChecklistListSide.deleteOne({
      uuid: listId,
    });
    if (listSide.deletedCount === 1) {
      return 'listSide deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createListSide,
  findAllListSide,
  getListSideById,
  listSideUpdate,
  deleteListSide,
};
