import TestResult from '../models/TestResult.js';
import ToeicTest from '../models/ToeicTest.js';
import User from '../models/User.js';

const testResultController = {
  takeFullToeic: async (req, res) => {
    try {
      const { answers, timeSpent, test } = req.body;
      const userId = req.user.id;
      const testDetail = await ToeicTest.findById(test);
      const correctAnwers = testDetail.answer;
      let correct = 0;
      let skip = 0;
      for (let i = 0; i < 200; i++){
        if (correctAnwers[i] === answers[i]) correct++;
        if(!answers[i]) skip++; 
      }
      const wrong = 200 - skip - correct;
      const newResult = new TestResult({ score: correct * 5, timeSpent, correct, skip, wrong, test, userAnswer: answers });

      const savedResult = await newResult.save();
      const user = await User.findById(userId);
      await user.updateOne({ $push: { testResults: savedResult._id } });

      res.status(201).json(savedResult);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getALL: async (req, res) => {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).populate({
        path: 'testResults',
        select: '-userAnswer',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'test',
          select: 'name publishYear image'
        }
      });
      const allResults = user.testResults;
      res.status(200).json(allResults);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOne: async (req, res) =>{
    try {
      const result = await TestResult.findById(req.params.id);
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json(error)
    }
  }
};

export default testResultController;
