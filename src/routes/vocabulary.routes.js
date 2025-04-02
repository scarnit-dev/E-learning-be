import { Router } from "express";
import vocabularyController from "../controllers/vocabulary.controller.js";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import flashcardMiddlewares from "../middlewares/flashcard.middlewares.js";

const vocabularyRouter = Router();

vocabularyRouter.post('/', authMiddlewares.verifyToken, flashcardMiddlewares.verifyOwner, vocabularyController.add);

vocabularyRouter.post('/addmany', vocabularyController.addMany);

vocabularyRouter.get('/:id', authMiddlewares.verifyToken, flashcardMiddlewares.verifyOwner, vocabularyController.get);

vocabularyRouter.patch('/update', vocabularyController.update);

vocabularyRouter.delete('/delete/:fid/:vid', vocabularyController.delete);

export default vocabularyRouter;
