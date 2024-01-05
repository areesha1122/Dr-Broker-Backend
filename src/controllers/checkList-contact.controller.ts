// src/controllers/contact.controller.ts

import { Request, Response } from 'express';
import { checkListContactService } from '../services';
import logger from '../utils/logger';
import { StatusCodes } from 'http-status-codes';
import { MESSAGES } from '../utils/response-messages';

async function createContact(req: Request, res: Response) {
  try {
    const contact = await checkListContactService.createContact(req);
    contact != null && logger.info(MESSAGES.CONTACT_CREATED);
    return res
      .status(contact === null ? StatusCodes.CONFLICT : StatusCodes.CREATED)
      .json(
        contact === null
          ? {
              status: StatusCodes.CONFLICT,
              message: MESSAGES.CONTACT_NOT_CREATED,
              contact: contact,
            }
          : {
              message: MESSAGES.CONTACT_CREATED,
              contact: contact,
            }
      );
  } catch (error) {
    console.error(MESSAGES.ERROR_CREATING_CHECK_LIST_CONTACT, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function findAllContact(req: Request, res: Response) {
  try {
    const bothSide = await checkListContactService.findAllContact(req);
    return res.json(bothSide);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_CONTACTS, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

async function getContactById(req: Request, res: Response) {
  try {
    const contact = await checkListContactService.getContactById(req.params.id);
    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.CONTACT_NOT_FOUND });
    }
    return res.json(contact);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_CONTACT, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function contactUpdate(req: Request, res: Response) {
  try {
    const contact = await checkListContactService.contactUpdate(req);
    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.CONTACT_NOT_FOUND });
    }
    return res.json(contact);
  } catch (error) {
    console.error(MESSAGES.ERROR_UPDATING_CHECK_LIST_CONTACT, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}
async function deleteContact(req: Request, res: Response) {
  try {
    const contact = await checkListContactService.deleteContact(req.params.id);
    if (!contact) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: MESSAGES.CONTACT_NOT_FOUND });
    }
    return res.json(contact);
  } catch (error) {
    console.error(MESSAGES.ERROR_FETCHING_CHECK_LIST_CONTACT, error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.SERVER_ERROR });
  }
}

export default {
  createContact,
  findAllContact,
  getContactById,
  contactUpdate,
  deleteContact,
};
