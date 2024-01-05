// src/routes/list-side.routes.ts

import { Router } from 'express';
import { buySideController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// todos
// misleading file name at the top

// Add listSide routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('buySide'),
  buySideController.createBuySide
);
router.get('/', verifyTokenMiddleware, buySideController.findAllBuySide);
router.get('/:listId', verifyTokenMiddleware, buySideController.getBuySideById);
router.put(
  '/:listId',
  verifyTokenMiddleware,
  Validator('buySide'),
  buySideController.updateBuySide
);
router.delete(
  '/:listId',
  verifyTokenMiddleware,
  buySideController.deleteBuySide
);

export default router;
