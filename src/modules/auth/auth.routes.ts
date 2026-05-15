import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validate.middleware';
import { registerSchema } from './auth.validation';

const router = Router();

const authController = new AuthController();

router.post(
    '/register',
    validate(registerSchema),
    authController.register,
);

router.post(
    '/login',
    authController.login,
);

export default router;