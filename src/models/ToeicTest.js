import mongoose from 'mongoose';

const ToeicTestSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  audio: { type: String, required: true },
  publishYear: { type: Number, required: true },
  answer: {
    type: [String],
    required: true,
    validate: { validator: (arr) => arr.length === 200, message: 'Array must have exactly 200 elements' }
  },
  
  part1: [String],
  part3: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  part4: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  part5: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  part6: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
  part7: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }]
});

const ToeicTest = mongoose.model('ToeicTest', ToeicTestSchema);
export default ToeicTest;
