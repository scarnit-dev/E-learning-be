import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    content: { type: String, required: true },
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    snippet: { type: String, required: true }
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
