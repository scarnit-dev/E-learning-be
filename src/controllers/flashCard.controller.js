import Flashcard from "../models/Flashcard.js"
import User from "../models/User.js";
import Vocabulary from "../models/Vocabulary.js";

const flashcardController = {
    add: async(req, res)=>{
        try {
            const {userId, ...other} = req.body;
            const newFlashcard = new Flashcard(other);
            const savedFlashcard = await newFlashcard.save();
            const userDoc = await User.findById(userId);
            await userDoc.updateOne({$push: {flashcards: savedFlashcard._id}})
            res.status(201).json({message: 'Successfully!', newFlashcard})
        } catch (error) {
            res.status(500).json(error)
        }        
    },
    addVocab: async(req, res)=>{
        try {
            const {flashcardId, ...other} = req.body;
            const newVocab = new Vocabulary(other);
            const savedVocab = await newVocab.save();
            const flashcard = await Flashcard.findById(flashcardId);
            await flashcard.updateOne({$push: {vocabulary: savedVocab._id}});
            res.status(201).json({message: 'Successfully!', newVocab});
        } catch (error) {
            res.status(500).json(error);        
        }
    }
}

export default flashcardController;