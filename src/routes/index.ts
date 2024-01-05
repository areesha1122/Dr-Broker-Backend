// src/routes/index.ts

import { Router } from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import listSideRoutes from './list-side.routes';
import propertyInfoRoutes from './property-info.routes';
import contractInfoRoutes from './contract-info.routes';
import buySideRoutes from './buy-side.routes';
import checkListContactRoutes from './checkList-contact.routes';
import bothSideRoutes from './both-side.routes';
import transactionRoutes from './transaction.routes';

const router = Router();

// Add more route imports here
router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/listSide', listSideRoutes);
router.use('/propertyInfo', propertyInfoRoutes);
router.use('/contractInfo', contractInfoRoutes);
router.use('/buySide', buySideRoutes);
router.use('/checkListContact', checkListContactRoutes);
router.use('/bothSide', bothSideRoutes);
router.use('/transaction', transactionRoutes);

export default router;
