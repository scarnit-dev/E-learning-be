import Flashcard from '../models/Flashcard.js';
import User from '../models/User.js';
import Vocabulary from '../models/Vocabulary.js';

const flashcardController = {
  // POST
  add: async (req, res) => {
    try {
      const userId = req.user.id;
      const newFlashcard = new Flashcard(req.body);
      const savedFlashcard = await newFlashcard.save();
      const userDoc = await User.findById(userId);
      await userDoc.updateOne({ $push: { flashcards: savedFlashcard._id } });
      res.status(201).json({ message: 'Successfully!', newFlashcard });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // GET
  get: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).populate('flashcards');
      const flashcards = user.flashcards.map((flashcard) => {
        const flashToObj = flashcard.toObject();
        return { ...flashToObj, vocabulary: flashToObj.vocabulary.length };
      });
      res.status(200).json(flashcards);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  // PATCH
  update: async (req, res) => {
    try {
      const { flashcardId, ...other } = req.body;
      const updatedFlashcard = await Flashcard.findByIdAndUpdate(flashcardId, other, {
        new: true,
        runValidators: true
      });
      res.status(200).json({ message: 'Successfully!', updatedFlashcard });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  //DELETE
  //updateMany() it document cha thoi
  //bulkWrite(): co the su dung trong truong hop nhieu document cha hon
  delete: async(req, res)=>{
    try {
      const {id} = req.params;
      await User.findByIdAndUpdate(req.user.id, { $pull: { flashcards: id } });
      const deletedFlashcard = await Flashcard.findByIdAndDelete(id);
      await Promise.all(deletedFlashcard.vocabulary.map(vocab => Vocabulary.findByIdAndDelete(vocab)));
      res.status(200).json({message: 'Successfully!'});
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default flashcardController;

///