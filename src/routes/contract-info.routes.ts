// src/routes/contact-info.routes.ts

import { Router } from 'express';
import { contractInfoController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add contactInfo routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('contractInfo'),
  contractInfoController.createContractInfo
);
router.get(
  '/',
  verifyTokenMiddleware,
  contractInfoController.findAllContractInfo
);
router.get(
  '/:id',
  verifyTokenMiddleware,
  contractInfoController.getContractInfoById
);
router.put(
  '/:id',
  verifyTokenMiddleware,
  Validator('updateContractInfo'),
  contractInfoController.contractInfoUpdate
);
router.delete(
  '/:id',
  verifyTokenMiddleware,
  contractInfoController.deleteContractInfo
);

export default router;
