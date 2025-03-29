import Question from '../models/Question.js';
import Section from '../models/Section.js';
import ToeicTest from '../models/ToeicTest.js';

const testToeicController = {
  add: async (req, res) => {
    const { name, audio, publishYear, answer, part1, part2, part3, part4, part5, part6, part7 } = req.body;
    try {
      const newTest = new ToeicTest({
        name,
        audio,
        publishYear,
        answer,
        part1,
        part2,
        part3,
        part4,
        part5,
        part6,
        part7
      });
      await newTest.save();
      return res.status(201).json({ message: 'Successfully!', test: newTest });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addSection: async (req, res) => {
    try {
      const { graphic, questions } = req.body;
      const newSection = new Section({ graphic, questions });
      const savedSection = await newSection.save();
      const populated = await savedSection.populate('questions');
      res.status(201).json({ message: 'Successfully!', section: populated });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addQuestion: async (req, res) => {
    try {
      const { index, question, a, b, c, d } = req.body;
      const newQuestion = new Question({ index, question, a, b, c, d });
      await newQuestion.save();
      return res.status(201).json({ message: 'Successfully!', question: newQuestion });
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOneToeic: async (req, res) => {
    try {
      const test = await ToeicTest.findById(req.params.id).populate([
        { path: 'part3', populate: { path: 'questions' } },
        { path: 'part4', populate: { path: 'questions' } },
        { path: 'part5' },
        { path: 'part6', populate: { path: 'questions' } },
        { path: 'part7', populate: { path: 'questions' } }
      ]);
      res.status(200).json(test);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getTestsByYear: async (req, res) =>{
    try {
      const tests = await ToeicTest.find().select(['image', 'name', 'publishYear']);
      res.status(200).json({tests})
    } catch (error) {
      res.status(500).json({error})
    }
  }
};

export default testToeicController;
