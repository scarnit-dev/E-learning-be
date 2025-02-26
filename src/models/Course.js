import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    picture: { type: String, required: true },
    students: { type: Number, default: 0 },
    rate: { type: Number, default: 0.0 }
  },
  { timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);
export default Course;
