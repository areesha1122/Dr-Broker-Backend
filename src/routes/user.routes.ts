// src/routes/user.routes.ts

import { Router } from 'express';
import { userController } from '../controllers';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';
import { checkRole } from '../middleware/authorization.middleware';

// todos
// rename 'verifyTokenMiddleware' to 'authenticate'
// code cleaning
// proper commenting

const router = Router();

// Add user routes here

// Fetch all users
router.get(
  '/',
  verifyTokenMiddleware,
  checkRole(['admin', 'agent']),
  userController.findAllUsers
);
// Fetch a user by ID
router.get('/:userId', verifyTokenMiddleware, userController.getUserById);
// Update the User
router.put('/profile/:userId', verifyTokenMiddleware, userController.profile);

export default router;
