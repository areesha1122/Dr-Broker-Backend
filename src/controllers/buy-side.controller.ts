// src/controllers/buySide.controller.ts

import { Request, Response } from 'express';
import { buySideService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createBuySide(req: Request, res: Response) {
  try {
    const buySide = await buySideService.createBuySide(req);
    buySide != null && logger.info(MESSAGES.BUY_SIDE_CREATED);
    return res
      .status(buySide === null ? StatusCodes.CONFLICT : StatusCodes.CREATED)
      .json(
        buySide === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.BUY_SIDE_NOT_CREATED,
              buySide: buySide,
            }
          : {
              message: MESSAGES.BUY_SIDE_CREATED,
              buySide: buySide,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_CHECK_LIST_BUY_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllBuySide(req: Request, res: Response) {
  try {
    const bothSide = await buySideService.findAllBuySide(req);
    return res.json(bothSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_BUY_SIDES, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getBuySideById(req: Request, res: Response) {
  try {
    const buySide = await buySideService.getBuySideById(req.params.listId);
    if (!buySide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.BUY_SIDE_NOT_FOUND });
    }

    return res.json(buySide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_BUY_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function updateBuySide(req: Request, res: Response) {
  try {
    const buySide = await buySideService.buySideUpdate(req);
    if (!buySide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.BUY_SIDE_NOT_FOUND });
    }
    return res.json(buySide);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_CHECK_LIST_BUY_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deleteBuySide(req: Request, res: Response) {
  try {
    const buySide = await buySideService.deleteBuySide(req.params.listId);
    if (!buySide) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.BUY_SIDE_NOT_FOUND });
    }
    return res.json(buySide);
  } catch (error) {
    console.error(MESSAGES.ERROR_DELETING_CHECK_LIST_BUY_SIDE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createBuySide,
  findAllBuySide,
  getBuySideById,
  updateBuySide,
  deleteBuySide,
};
