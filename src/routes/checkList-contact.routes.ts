// src/routes/checkListContact-info.routes.ts

import { Router } from 'express';
import { checkListContactController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add contactInfo routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('checkListContact'),
  checkListContactController.createContact
);
router.get(
  '/',
  verifyTokenMiddleware,
  checkListContactController.findAllContact
);
router.get(
  '/:id',
  verifyTokenMiddleware,
  checkListContactController.getContactById
);
router.put(
  '/:id',
  verifyTokenMiddleware,
  Validator('checkListContact'),
  checkListContactController.contactUpdate
);
router.delete(
  '/:id',
  verifyTokenMiddleware,
  checkListContactController.deleteContact
);

export default router;
