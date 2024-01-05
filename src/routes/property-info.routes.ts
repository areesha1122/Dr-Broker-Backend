// src/routes/property-info.routes.ts

import { Router } from 'express';
import { propertyInfoController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add propertyInfo routes here

router.post(
  '/',
  verifyTokenMiddleware,
  Validator('property'),
  propertyInfoController.createPropertyInfo
);
router.get(
  '/',
  verifyTokenMiddleware,
  propertyInfoController.findAllPropertyInfo
);
router.get(
  '/:id',
  verifyTokenMiddleware,
  propertyInfoController.getProPertyInfoById
);
router.put(
  '/:id',
  verifyTokenMiddleware,
  Validator('updateProperty'),
  propertyInfoController.propertyInfoUpdate
);
router.delete(
  '/:id',
  verifyTokenMiddleware,
  propertyInfoController.deletePropertyInfo
);

export default router;
