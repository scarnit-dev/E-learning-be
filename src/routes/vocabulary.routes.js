import { Router } from "express";
import vocabularyController from "../controllers/vocabulary.controller.js";

const vocabularyRouter = Router();

vocabularyRouter.post('/add', vocabularyController.add);

vocabularyRouter.post('/addmany', vocabularyController.addMany);

vocabularyRouter.get('/get/:id', vocabularyController.get);

vocabularyRouter.patch('/update', vocabularyController.update);

vocabularyRouter.delete('/delete/:fid/:vid', vocabularyController.delete);

export default vocabularyRouter;
