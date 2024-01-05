// src/routes/both-side.routes.ts

import { Router } from 'express';
import { bothSideController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add bothSide routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('bothSide'),
  bothSideController.createBothSide
);
router.get('/', verifyTokenMiddleware, bothSideController.findAllBothSide);
router.get(
  '/:listId',
  verifyTokenMiddleware,
  bothSideController.getBothSideById
);
router.put(
  '/:listId',
  verifyTokenMiddleware,
  Validator('bothSide'),
  bothSideController.updateBothSide
);
router.delete(
  '/:listId',
  verifyTokenMiddleware,
  bothSideController.deleteBothSide
);

export default router;
