// src/services/contact.service.ts

import { Request } from 'express';
import { Contact, IContact } from '../models'; // Import models from the index file
import { paginateResults } from '../utils/pagination.utils';

/**
 * Create a new Contact based on the data provided in the request body.
 * @param req The Express request object containing Contact data.
 * @returns A promise that resolves to the created Contact.
 */
async function createContact(req: Request): Promise<IContact | null> {
  try {
    const contact = await Contact.create(req.body);
    if (contact) {
      return contact;
    }
    return null;
  } catch (error) {
    throw error;
  }
}
async function findAllContact(req: Request): Promise<IContact[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};
    const { results, total } = await paginateResults<IContact>(Contact, {
      page,
      limit,
      order: 'createdAt',
      filters,
    });
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
async function getContactById(id: string): Promise<IContact | null> {
  try {
    const contact = await Contact.findOne({ uuid: id });
    return contact;
  } catch (error) {
    throw error;
  }
}
async function contactUpdate(req: Request): Promise<IContact | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { id } = req.params;
    const contact = await Contact.findOneAndUpdate({ uuid: id }, data, {
      new: true,
    });
    return contact;
  } catch (error) {
    throw error;
  }
}
async function deleteContact(id: string): Promise<string | null> {
  try {
    const contact = await Contact.deleteOne({ uuid: id });
    if (contact.deletedCount === 1) {
      return 'contact deleted Successfully.';
    }
    return null;
  } catch (error) {
    throw error;
  }
}

export default {
  createContact,
  findAllContact,
  getContactById,
  contactUpdate,
  deleteContact,
};
