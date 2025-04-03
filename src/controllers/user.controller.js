import User from '../models/User.js';

const userController = {
  updateExamInfor: async (req, res) => {
    try {
      const { newDate, newTarget } = req.body;
      const userId = req.user.id;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { examDate: newDate, targetScore: newTarget },
        { new: true }
      );
      return res.status(200).json({ updatedUser });
    } catch (error) {
      console.log(error);
    }
  },
  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select(['name', 'avatar', 'admin', 'enrolledCourses', 'savedBlog', 'blog', 'createdAt'])
        .populate(['enrolledCourses', 'savedBlog', 'blog']);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default userController;
