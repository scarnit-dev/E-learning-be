import Flashcard from '../models/Flashcard.js';
import Vocabulary from '../models/Vocabulary.js';

const vocabularyController = {
  add: async (req, res) => {
    try {
      const { flashcardId, ...other } = req.body;
      const newVocab = new Vocabulary(other);
      const savedVocab = await newVocab.save();
      const flashcard = await Flashcard.findById(flashcardId);
      await flashcard.updateOne({ $push: { vocabulary: savedVocab._id } });
      res.status(201).json({ message: 'Successfully!', newVocab });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addMany: async (req, res) => {
    try {
      const { flashcardId, newVocabs } = req.body;
      const vocabs = await Vocabulary.insertMany(newVocabs);

      const vocabsId = vocabs.map((vocab) => vocab._id);

      await Flashcard.findByIdAndUpdate(flashcardId, { $push: { vocabulary: { $each: vocabsId } } });

      return res.status(201).json({ message: 'Successfully!', vocabs });
    } catch (error) {
      res.status(201).json(error);
    }
  },
  get: async (req, res) => {
    try {
      const flashcard = await Flashcard.findById(req.params.id).populate('vocabulary');
      res.status(200).json({ message: 'Successfully!', vocabulary: flashcard.vocabulary });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  update: async (req, res) => {
    try {
      const { vocabId, ...other } = req.body;
      const updatedVocab = await Vocabulary.findByIdAndUpdate(vocabId, other, {
        returnDocument: 'after',
        runValidators: true
      });
      res.status(200).json({ message: 'Successfully!', updatedVocab });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { fid, vid } = req.params;
      await Flashcard.findByIdAndUpdate(fid, { $pull: { vocabulary: vid } });
      const deletedVocab = await Vocabulary.findByIdAndDelete(vid);
      res.status(200).json({ message: 'Successfully!', deletedVocab });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
export default vocabularyController;
