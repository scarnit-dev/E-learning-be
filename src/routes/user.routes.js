import { Router } from "express";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.patch('/updateExamInfor', authMiddlewares.verifyToken, userController.updateExamInfor);

userRouter.get('/:id', userController.getProfile);

export default userRouter;