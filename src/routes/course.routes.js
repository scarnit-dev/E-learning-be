import { Router } from 'express';
import courseController from '../controllers/course.controller.js';
import authMiddlewares from '../middlewares/auth.middlewares.js';

const courseRouter = Router();

courseRouter.post('/add', authMiddlewares.verifyAdminToken, courseController.addCourse);

courseRouter.get('/all', authMiddlewares.verifyToken, courseController.getAllCourses);

export default courseRouter;
