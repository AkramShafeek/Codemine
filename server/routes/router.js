const express = require('express');
const router = express.Router();
const {
  createQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions, 
  addTestCases} = require('../controllers/controller');

router.route('/')
  .post(createQuestions)
  .get(getQuestions)
  .put(updateQuestions)
  .delete(deleteQuestions);

router.route('/addTestCases')
  .post(addTestCases);

module.exports = router;