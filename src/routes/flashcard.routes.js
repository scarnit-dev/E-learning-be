import { Router } from "express";
import flashcardController from "../controllers/flashcard.controller.js";

const flashcardRouter = Router();

flashcardRouter.post('/add', flashcardController.add);

flashcardRouter.get('/get/:id', flashcardController.get);

flashcardRouter.patch('/update', flashcardController.update);

flashcardRouter.delete('/delete/:uid/:fid', flashcardController.delete);

export default flashcardRouter;