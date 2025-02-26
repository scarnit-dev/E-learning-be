import mongoose from 'mongoose';

const testResultSchema = new mongoose.Schema(
  {
    score: { type: Number, required: true },
    timeSpent: { type: Number, required: true },
    correctSum: { type: Number, required: true },
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'ToeicTest', required: true },
    userAnswer: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length === 200,
        message: 'Array must have exactly 200 elements'
      }
    }
  },
  { timestamps: true }
);

const TestResult = mongoose.model('TestResult', testResultSchema);
export default TestResult;
