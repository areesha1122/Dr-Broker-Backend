// src/controllers/bothSide.controller.ts

import { Request, Response } from 'express';
import { bothSideService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createBothSide(req: Request, res: Response) {
  try {
    const bothSide = await bothSideService.createBothSide(req);

    bothSide != null && logger.info(MESSAGES.BOTH_SIDE_CREATED);
    return res
      .status(bothSide === null ? StatusCodes.CONFLICT : StatusCodes.CREATED)
      .json(
        bothSide === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.BOTH_SIDE_NOT_CREATED,
              bothSide: bothSide,
            }
          : {
              message: MESSAGES.BOTH_SIDE_CREATED,
              bothSide: bothSide,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_CHECK_LIST_BOTH_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllBothSide(req: Request, res: Response) {
  try {
    const bothSide = await bothSideService.findAllBothSide(req);
    return res.json(bothSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_BOTH_SIDES, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getBothSideById(req: Request, res: Response) {
  try {
    const bothSide = await bothSideService.getBothSideById(req.params.listId);

    if (!bothSide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.BOTH_SIDE_NOT_FOUND });
    }

    return res.json(bothSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_BOTH_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function updateBothSide(req: Request, res: Response) {
  try {
    const bothSide = await bothSideService.bothSideUpdate(req);
    if (!bothSide) {
      // bothSide not found
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.BOTH_SIDE_NOT_FOUND });
    }
    return res.json(bothSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_CHECK_LIST_BOTH_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deleteBothSide(req: Request, res: Response) {
  try {
    const bothSide = await bothSideService.deleteBothSide(req.params.listId);
    if (!bothSide) {
      // bothSide not found
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.BOTH_SIDE_NOT_FOUND });
    }
    return res.json(bothSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_DELETING_CHECK_LIST_BOTH_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createBothSide,
  findAllBothSide,
  getBothSideById,
  updateBothSide,
  deleteBothSide,
};
