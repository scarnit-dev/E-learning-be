import { Router } from "express";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import testResultController from "../controllers/testResult.controller.js";

const testResultRouter = Router();

testResultRouter.post('/take-full', authMiddlewares.verifyToken, testResultController.takeFullToeic);

testResultRouter.get('/getAll', authMiddlewares.verifyToken, testResultController.getALL);

export default testResultRouter;