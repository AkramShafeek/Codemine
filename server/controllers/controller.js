const createQuestions = (req, res) => {
  res.send("You can create questions from here");
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