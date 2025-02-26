import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    graphic: {type: String, default: ''},
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }]
});

const Section = mongoose.model('Section', sectionSchema);
export default Section;