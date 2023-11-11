const { mkdir } = require('../filesystem/filesystem');

const createQuestions = async (req, res) => {
  try {
    const { dirname } = req.body;    
    const response = await mkdir(dirname);
    res.status(200).send(response);
  } catch (error) {    
    res.status(500).send({ success: false, error: error.message});
  }
}
const getQuestions = (req, res) => {
  res.send("You can get questions from here");
}

const updateQuestions = (req, res) => {
  res.send("You can update questions from here");
}

const deleteQuestions = (req, res) => {
  res.send("You can delete questions from here");
}


module.exports = {
  createQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions
}