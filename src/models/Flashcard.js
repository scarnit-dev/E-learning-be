import mongoose from 'mongoose';

const LANGUAGES = ['en', 'ko', 'ja', 'zh'];
const flashcardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: '' },
    language: { type: String, enum: LANGUAGES, default: 'en' },
    vocabulary: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vocabulary' }]
  },
  { timestamps: true }
);

const Flashcard = mongoose.model('Flashcard', flashcardSchema);
export default Flashcard;
