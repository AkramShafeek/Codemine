const { mkdir } = require('../filesystem/filesystem');
const Question = require('./utils/Question');

const createQuestions = async (req, res) => {
  try {
    const questionDetails = req.body.question;
    const question = new Question(questionDetails);
    await question.save();
    res.status(200).send("Question created successfully");
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}
const getQuestions = async (req, res) => {
  try {
    const title = req.query.questionName;
    const question = new Question({ title });
    const data = await question.read();
    res.status(200).send({ success: true, data });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

const updateQuestions = async (req, res) => {
  try {
    const questionDetails = req.body.question;
    const question = new Question(questionDetails);
    await question.update();
    res.status(200).send("Question created successfully");
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

const deleteQuestions = async (req, res) => {
  try {
    const title = req.query.questionName;
    const question = new Question({ title });
    await question.delete();
    res.status(200).send({ success: true, msg: `${title} deleted successfully` });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}

const addTestCases = async (req, res) => {
  try {    
    const question = new Question(req.body.question);
    await question.addTestCases();
    res.status(200).send({ success: true, msg: `Added test cases successfully` });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
}


module.exports = {
  createQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions,
  addTestCases
}