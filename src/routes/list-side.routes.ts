// src/routes/list-side.routes.ts

import { Router } from 'express';
import { listSideController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add listSide routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('listSide'),
  listSideController.createListSide
);
router.get('/', verifyTokenMiddleware, listSideController.findAllListSide);
router.get(
  '/:listId',
  verifyTokenMiddleware,
  listSideController.getListSideById
);
router.put(
  '/:listId',
  verifyTokenMiddleware,
  Validator('listSide'),
  listSideController.updateListSide
);
router.delete(
  '/:listId',
  verifyTokenMiddleware,
  listSideController.deleteListSide
);

export default router;
