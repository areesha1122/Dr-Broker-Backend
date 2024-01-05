// src/services/user.service.ts

import { Request } from 'express';
import { User, IUser } from '../models';
import { paginateResults } from '../utils/pagination.utils';

/**
 * Fetch all users from the database.
 * @returns A promise that resolves to an array of users.
 */
async function findAllUsers(req: Request): Promise<IUser[] | any> {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const filters = req.body.filter || {};

    const { results, total } = await paginateResults<IUser>(User, {
      page,
      limit,
      order: 'createdAt',
      filters,
      excludeFields: ['password', 'token'],
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
async function getUserById(userId: string): Promise<IUser | null> {
  try {
    const user = await User.findOne({ uuid: userId }).select([
      '-password',
      '-_id',
      '-token',
    ]);
    return user;
  } catch (error) {
    throw error;
  }
}
async function profileUpdate(req: Request): Promise<IUser | null> {
  try {
    const data = { ...req.body, updatedAt: Date.now() };
    const { userId } = req.params;
    const user = await User.findOneAndUpdate({ uuid: userId }, data, {
      new: true,
    }).select(['-password', '-_id', '-token']);
    return user;
  } catch (error) {
    throw error;
  }
}

export default {
  findAllUsers,
  getUserById,
  profileUpdate,
};
