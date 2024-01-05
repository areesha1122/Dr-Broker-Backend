// src/routes/contact-info.routes.ts

import { Router } from 'express';
import { transactionController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add contactInfo routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('transaction'),
  transactionController.createTransaction
);
router.get(
  '/userId/:id',
  verifyTokenMiddleware,
  transactionController.findAllTransaction
);
router.get(
  '/:id',
  verifyTokenMiddleware,
  transactionController.getTransactionById
);
router.put(
  '/:id',
  verifyTokenMiddleware,
  Validator('transaction'),
  transactionController.transactionUpdate
);
router.delete(
  '/:id',
  verifyTokenMiddleware,
  transactionController.deleteTransaction
);

export default router;
