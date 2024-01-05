// src/controllers/auth.controller.ts

import { Request, Response } from 'express';
import { authService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';
async function createUser(req: Request, res: Response) {
  try {
    const newUser = await authService.createUser(req);
    newUser != null && logger.info(MESSAGES.USER_CREATED);
    return res
      .status(newUser === null ? StatusCodes.CONFLICT : StatusCodes.CREATED)
      .json({
        message:
          newUser === null
            ? MESSAGES.USER_ALREADY_EXIST
            : MESSAGES.USER_CREATED,
        user: newUser,
      });
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATE_USER, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function login(req: Request, res: Response) {
  try {
    const user = await authService.loginUser(req);

    if (user) {
      logger.info(MESSAGES.USER_LOGIN);
      return res.status(StatusCodes.OK).json({
        message: MESSAGES.USER_LOGIN,
        user,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: MESSAGES.INVALID_USER,
        user: null,
      });
    }
  } catch (error) {
    console.error(MESSAGES.ERROR_LOGIN, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}
async function fogetPassword(req: Request, res: Response) {
  try {
    await authService.forgetPassword(req);
    logger.info(MESSAGES.FORGET_PASSWORD_SUCCESS);
    return res.status(StatusCodes.OK).json({
      message: MESSAGES.FORGET_PASSWORD_SUCCESS,
    });
  } catch (error) {
    console.error(MESSAGES.ERROR_FORGET_PASSWORD, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}
async function resetPassword(req: Request, res: Response) {
  try {
    const user = await authService.resetPassword(req);
    if (user) {
      logger.info(MESSAGES.RESET_PASSWORD);
      return res.status(StatusCodes.OK).json({
        message: MESSAGES.RESET_PASSWORD,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: MESSAGES.INVALID_CREDENTIALS,
      });
    }
  } catch (error) {
    console.error(MESSAGES.ERROR_RESET_PASSWORD, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}
async function verify(req: Request, res: Response) {
  try {
    const user = await authService.verifyUser(req);
    if (user) {
      logger.info(MESSAGES.USER_EMAIL_VERIFIED);
      return res.status(StatusCodes.OK).json({
        message: MESSAGES.USER_EMAIL_VERIFIED,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: MESSAGES.INVALID_CREDENTIALS,
      });
    }
  } catch (error) {
    console.error(MESSAGES.ERROR_VERIFY_USER, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}
async function userPasswordChange(req: Request, res: Response) {
  try {
    const user = await authService.userPasswordChanged(req);
    if (user) {
      logger.info(MESSAGES.USER_PASSWORD_CHANGE);
      return res.status(StatusCodes.OK).json({
        message: MESSAGES.USER_PASSWORD_CHANGE,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: MESSAGES.PASSWORD_WRONG,
      });
    }
  } catch (error) {
    console.error(MESSAGES.ERROR_PASSWORD_CHANGE, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}
async function googleAuth(req: Request, res: Response) {
  try {
    const user = await authService.googleAuth(req);
    if (user) {
      logger.info(MESSAGES.GOOGLE_AUTH_SUCCESS);
      return res.status(StatusCodes.OK).json({
        message: MESSAGES.GOOGLE_AUTH_SUCCESS,
        user,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: MESSAGES.WRONG_USER,
      });
    }
  } catch (error) {
    console.error(MESSAGES.ERROR_GOOGLE_AUTH, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}
async function facebookAuth(req: Request, res: Response) {
  try {
    const user = await authService.facebookAuth(req);
    if (user) {
      logger.info(MESSAGES.FACEBOOK_AUTH_SUCCESS);
      return res.status(StatusCodes.OK).json({
        message: MESSAGES.FACEBOOK_AUTH_SUCCESS,
        user,
      });
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: MESSAGES.WRONG_USER,
      });
    }
  } catch (error) {
    console.error(MESSAGES.ERROR_FACEBOOK_AUTH, error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: MESSAGES.SERVER_ERROR,
    });
  }
}

export default {
  createUser,
  login,
  fogetPassword,
  resetPassword,
  verify,
  userPasswordChange,
  googleAuth,
  facebookAuth,
};
