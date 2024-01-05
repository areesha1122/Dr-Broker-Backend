// src/routes/auth.routes.ts

import { Router } from 'express';
import { authController } from '../controllers';
import Validator from '../middleware/validation.middleware';
import { verifyTokenMiddleware } from '../middleware/authentication.middleware';

const router = Router();

// Add user routes here
// Create a user
router.post('/', Validator('register'), authController.createUser);
router.post('/login', Validator('login'), authController.login);
router.post(
  '/forgetPassword',
  Validator('forgetPassword'),
  authController.fogetPassword
);
router.post(
  '/resetPassword/:token',
  Validator('resetPassword'),
  authController.resetPassword
);
router.get('/verify/:token', authController.verify);
router.patch(
  '/changePassword/:userId',
  verifyTokenMiddleware,
  Validator('changePassword'),
  authController.userPasswordChange
);
router.get(
  '/google/:token',
  Validator('socialAuth'),
  authController.googleAuth
);
router.get(
  '/facebook/:token',
  Validator('socialAuth'),
  authController.facebookAuth
);

export default router;
