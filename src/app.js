import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import courseRouter from './routes/course.routes.js';
import testToeicRouter from './routes/testToeic.routes.js';
import vocabularyRouter from './routes/vocabulary.routes.js';
import userRouter from './routes/user.routes.js';
import testResultRouter from './routes/testResult.routes.js';
import blogRouter from './routes/blog.routes.js';
import flashcardRouter from './routes/flashcard.routes.js';

dotenv.config();
const app = express();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Could not connect to MongoDB', err);
  });

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use('/v1/auth', authRouter);

app.use('/v1/course', courseRouter);

app.use('/v1/test-toeic', testToeicRouter);

app.use('/v1/flashcard', flashcardRouter);

app.use('/v1/vocab', vocabularyRouter);

app.use('/v1/user', userRouter);

app.use('/v1/testResult', testResultRouter);

app.use('/v1/blog', blogRouter)

export default app;