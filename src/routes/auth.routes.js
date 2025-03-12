import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import authMiddlewares from '../middlewares/auth.middlewares.js';
const authRouter = Router();

authRouter.post('/register', authController.register);

authRouter.post('/login', authController.login);

authRouter.post('/refresh', authController.requestRefreshToken);

authRouter.post('/logout', authMiddlewares.verifyToken, authController.logout);

authRouter.get('/google', authMiddlewares.getGoogleData, authController.googleLogin);

export default authRouter;
