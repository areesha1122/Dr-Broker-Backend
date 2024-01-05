// src/controllers/listSide.controller.ts

import { Request, Response } from 'express';
import { listSideService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createListSide(req: Request, res: Response) {
  try {
    const listSide = await listSideService.createListSide(req);
    listSide != null && logger.info(MESSAGES.LIST_SIDE_CREATED);
    return res
      .status(listSide === null ? StatusCodes.CONFLICT : StatusCodes.CREATED)
      .json(
        listSide === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.LIST_SIDE_NOT_CREATED,
              listSide: listSide,
            }
          : {
              message: MESSAGES.LIST_SIDE_CREATED,
              listSide: listSide,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_LIST_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllListSide(req: Request, res: Response) {
  try {
    const listSide = await listSideService.findAllListSide(req);
    return res.json(listSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_LIST_SIDES, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getListSideById(req: Request, res: Response) {
  try {
    const listSide = await listSideService.getListSideById(req.params.listId);
    if (!listSide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.LIST_SIDE_NOT_FOUND });
    }
    return res.json(listSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_LIST_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function updateListSide(req: Request, res: Response) {
  try {
    const listSide = await listSideService.listSideUpdate(req);
    if (!listSide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.LIST_SIDE_NOT_FOUND });
    }
    return res.json(listSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_LIST_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deleteListSide(req: Request, res: Response) {
  try {
    const listSide = await listSideService.deleteListSide(req.params.listId);
    if (!listSide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.LIST_SIDE_NOT_FOUND });
    }
    return res.json(listSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_DELETING_LIST_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createListSide,
  findAllListSide,
  getListSideById,
  updateListSide,
  deleteListSide,
};
