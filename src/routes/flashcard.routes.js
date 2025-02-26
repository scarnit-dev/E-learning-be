import { Router } from "express";
import flashcardController from "../controllers/flashCard.controller.js";

const flashcardRouter = Router();

flashcardRouter.post('/add', flashcardController.add);

flashcardRouter.post('/add-vocab', flashcardController.addVocab)

export default flashcardRouter;