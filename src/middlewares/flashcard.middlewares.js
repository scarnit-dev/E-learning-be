import User from "../models/User.js";

const flashcardMiddlewares = {
    verifyOwner: async (req, res, next) =>{
        const user = await User.findById(req.user.id);
        const flashcardId = req.body.flashcardId || req.params.id;
        const isOwner = user.flashcards.some(id => id.toString() === flashcardId);
        if(!isOwner) return res.status(403).json({message: 'This flashcard does not belong to you!'});
        next();
    }
}
export default flashcardMiddlewares;