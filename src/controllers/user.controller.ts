// src/controllers/user.controller.ts

import { Request, Response } from 'express';
import { userService } from '../services';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function findAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.findAllUsers(req);
    return res.json(users);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_ALL_USERS, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getUserById(req: Request, res: Response) {
  try {
    const userId = req.params.userId;
    const user = await userService.getUserById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.USER_NOT_FOUND });
    }
    return res.json(user);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_USER, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function profile(req: Request, res: Response) {
  try {
    const user = await userService.profileUpdate(req);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.USER_NOT_FOUND });
    }
    return res.json(user);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATE_PROFILE, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  findAllUsers,
  getUserById,
  profile,
};
