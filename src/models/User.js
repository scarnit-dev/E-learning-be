import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    admin: { type: Boolean, default: false },
    avatar: { type: String, default: '' },
    sub: { type: String, default: '' },
    targetScore: { type: Number, default: 0 },
    examDate: { type: Date, default: Date.now },
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
    testResults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestResult' }],
    enrolledCourses: [{ type: mongoose.Schema.ObjectId, ref: 'Course' }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
