// src/controllers/contractInfo.controller.ts

import { Request, Response } from 'express';
import { contractInfoService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createContractInfo(req: Request, res: Response) {
  try {
    const contractInfo = await contractInfoService.createContractInfo(req);
    contractInfo != null && logger.info(MESSAGES.CONTRACT_INFO_CREATED);
    return res
      .status(
        contractInfo === null ? StatusCodes.CONFLICT : StatusCodes.CREATED
      )
      .json(
        contractInfo === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.CONTRACT_INFO_NOT_CREATED,
              contractInfo: contractInfo,
            }
          : {
              message: MESSAGES.CONTRACT_INFO_CREATED,
              contractInfo: contractInfo,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_CONTRACT_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllContractInfo(req: Request, res: Response) {
  try {
    const contract = await contractInfoService.findAllContractInfo(req);
    return res.json(contract);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CONTRACT_INFOS, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getContractInfoById(req: Request, res: Response) {
  try {
    const contractInfo = await contractInfoService.getContractInfoById(
      req.params.id
    );
    if (!contractInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.CONTRACT_INFO_NOT_FOUND });
    }
    return res.json(contractInfo);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CONTRACT_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function contractInfoUpdate(req: Request, res: Response) {
  try {
    const contractInfo = await contractInfoService.contractInfoUpdate(req);
    if (!contractInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.CONTRACT_INFO_NOT_FOUND });
    }
    return res.json(contractInfo);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_CONTRACT_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deleteContractInfo(req: Request, res: Response) {
  try {
    const contractInfo = await contractInfoService.deleteContractInfo(
      req.params.id
    );
    if (!contractInfo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.CONTRACT_INFO_NOT_FOUND });
    }
    return res.json(contractInfo);
  } catch (error) {
    console.error(MESSAGES.ERROR_DELETING_CONTRACT_INFO, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createContractInfo,
  findAllContractInfo,
  getContractInfoById,
  contractInfoUpdate,
  deleteContractInfo,
};
