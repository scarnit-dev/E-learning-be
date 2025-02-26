import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  index: {type: Number, required: true},
  question: { type: String, trim: true },
  a: { type: String, trim: true, required: true },
  b: { type: String, trim: true, required: true },
  c: { type: String, trim: true, required: true },
  d: { type: String, trim: true }
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
