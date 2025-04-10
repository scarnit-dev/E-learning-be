import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    admin: { type: Boolean, default: false },
    avatar: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' },
    sub: { type: String, default: '' },
    targetScore: { type: Number, default: 0 },
    examDate: { type: String, default: '' },
    flashcards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Flashcard' }],
    testResults: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TestResult' }],
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    blog: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}],
    savedBlog: [{type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
export default User;
