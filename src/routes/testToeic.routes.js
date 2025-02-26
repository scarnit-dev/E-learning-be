import { Router } from "express";
import testToeicController from "../controllers/testToeic.controller.js";

const testToeicRouter = Router();

testToeicRouter.post('/add-toeic', testToeicController.add);

testToeicRouter.post('/add-section', testToeicController.addSection);

testToeicRouter.post('/add-question', testToeicController.addQuestion);

testToeicRouter.get('/get-one-toeic/:id', testToeicController.getOneToeic);

testToeicRouter.post('/take-full', testToeicController.takeFullToeic);


export default testToeicRouter;