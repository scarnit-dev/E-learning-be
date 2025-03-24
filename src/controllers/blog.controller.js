import Blog from '../models/Blog.js';
import User from '../models/User.js';

const blogController = {
  add: async (req, res) => {
    try {
      const userId = req.user.id;
      const newBlog = new Blog({ ...req.body, user: userId });
      const savedBlog = await newBlog.save();
      const user = await User.findById(userId);
      await user.updateOne({ $push: { blog: savedBlog._id } });
      res.status(201).json({ message: 'Successfully!', blog: savedBlog });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getAll: async (req, res) => {
    try {
      const pageSize = 10;
      const blogsTotal = await Blog.countDocuments();
      const blogs = await Blog.find()
        .select('-content')
        .sort({ createdAt: -1 })
        .skip((req.query.page - 1) * pageSize)
        .limit(pageSize)
        .lean()
        .populate('user', ['avatar', 'name', 'admin']);
      res.status(200).json({ blogs, blogsTotal });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
  getOne: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
        .select('-snippet')
        .populate('user', ['name', 'avatar', 'admin', 'createdAt']);
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
};
export default blogController;
