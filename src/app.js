import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import courseRouter from './routes/course.routes.js';
import testToeicRouter from './routes/testToeic.routes.js';
import flashcardRouter from './routes/flashCard.routes.js';
import vocabularyRouter from './routes/vocabulary.routes.js';


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

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRouter);

app.use('/api/course', courseRouter);

app.use('/api/test', testToeicRouter);

app.use('/api/flashcard', flashcardRouter);

app.use('/api/vocab', vocabularyRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});

export default app;