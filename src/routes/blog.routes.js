import { Router } from "express";
import authMiddlewares from "../middlewares/auth.middlewares.js";
import blogController from "../controllers/blog.controller.js";

const blogRouter = Router();

blogRouter.post('/', authMiddlewares.verifyToken, blogController.add);

blogRouter.get('/', blogController.getAll);

blogRouter.get('/:id', blogController.getOne);

export default blogRouter;