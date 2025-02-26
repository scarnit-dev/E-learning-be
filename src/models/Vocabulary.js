import mongoose from 'mongoose';

const PARTS_OF_SPEECH = ['n', 'v', 'adj', 'adv', 'proun', 'prep', 'conj', 'interj'];
const vocabularySchema = new mongoose.Schema(
  {
    word: { type: String, required: true, unique: true},
    meaning: { type: String, required: true },
    partOfSpeech: {type: String, enum: PARTS_OF_SPEECH},
    image: String,
    exampleSentence: String,
    phonetic: String,
    description: String,
  },
  { timestamps: true }
);

const Vocabulary = mongoose.model('Vocabulary', vocabularySchema);
export default Vocabulary;
