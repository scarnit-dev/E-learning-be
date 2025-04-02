import { Router } from "express";
import flashcardController from "../controllers/flashcard.controller.js";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import flashcardMiddlewares from "../middlewares/flashcard.middlewares.js";

const flashcardRouter = Router();

flashcardRouter.post('/', authMiddlewares.verifyToken, flashcardController.add);

flashcardRouter.get('/', authMiddlewares.verifyToken, flashcardController.get);

flashcardRouter.patch('/', authMiddlewares.verifyToken, flashcardMiddlewares.verifyOwner, flashcardController.update);

flashcardRouter.delete('/:id', authMiddlewares.verifyToken, flashcardController.delete);

export default flashcardRouter;