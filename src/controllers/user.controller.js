import User from "../models/User.js";

const userController = {
  updateExamInfor: async (req, res) => {
    try {
      const { newDate, newTarget } = req.body;
      const userId = req.user.id;
      const updatedUser = await User.findByIdAndUpdate(userId, {examDate: newDate, targetScore: newTarget}, {new: true});
      return res.status(200).json({ updatedUser });
    } catch (error) {
      console.log(error);
    }
  }
};

export default userController;