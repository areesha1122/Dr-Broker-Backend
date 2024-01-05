// src/controllers/property.controller.ts

import { Request, Response } from 'express';
import { propertyInfoService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createPropertyInfo(req: Request, res: Response) {
  try {
    const propertyInfo = await propertyInfoService.createPropertyInfo(req);
    propertyInfo != null && logger.info(MESSAGES.PROPERTY_INFO_CREATED);
    return res
      .status(
        propertyInfo === null ? StatusCodes.CONFLICT : StatusCodes.CREATED
      )
      .json(
        propertyInfo === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.PROPERTY_INFO_NOT_CREATED,
              propertyInfo: propertyInfo,
            }
          : {
              message: MESSAGES.PROPERTY_INFO_CREATED,
              propertyInfo: propertyInfo,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_PROPERTY_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllPropertyInfo(req: Request, res: Response) {
  try {
    const property = await propertyInfoService.findAllPropertyInfo(req);
    return res.json(property);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_PROPERTY_INFOS, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getProPertyInfoById(req: Request, res: Response) {
  try {
    const propertyInfo = await propertyInfoService.getPropertyInfoById(
      req.params.id
    );
    if (!propertyInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.PROPERTY_INFO_NOT_FOUND });
    }
    return res.json(propertyInfo);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_PROPERTY_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function propertyInfoUpdate(req: Request, res: Response) {
  try {
    const propertyInfo = await propertyInfoService.propertyInfoUpdate(req);
    if (!propertyInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.PROPERTY_INFO_NOT_FOUND });
    }
    return res.json(propertyInfo);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_PROPERTY_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deletePropertyInfo(req: Request, res: Response) {
  try {
    const propertyInfo = await propertyInfoService.deletePropertyInfo(
      req.params.id
    );
    if (!propertyInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.PROPERTY_INFO_NOT_FOUND });
    }
    return res.json(propertyInfo);
  } catch (error) {
    console.error(MESSAGES.ERROR_DELETING_PROPERTY_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createPropertyInfo,
  findAllPropertyInfo,
  getProPertyInfoById,
  propertyInfoUpdate,
  deletePropertyInfo,
};
