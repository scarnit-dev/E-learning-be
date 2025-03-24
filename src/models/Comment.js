import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, requiredd: true },
    sub_comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);
export default Comment;
