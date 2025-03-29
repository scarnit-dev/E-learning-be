import { Router } from "express";
import testToeicController from "../controllers/testToeic.controller.js";
import authController from "../controllers/auth.controller.js";
import authMiddlewares from "../middlewares/auth.middlewares.js";

const testToeicRouter = Router();

testToeicRouter.post('/', testToeicController.add);

testToeicRouter.post('/add-section', testToeicController.addSection);

testToeicRouter.post('/add-question', testToeicController.addQuestion);

testToeicRouter.get('/get-one/:id',authMiddlewares.verifyToken , testToeicController.getOneToeic);

testToeicRouter.get('/', testToeicController.getTestsByYear)


export default testToeicRouter;