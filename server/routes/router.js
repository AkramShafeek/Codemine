const express = require('express');
const router = express.Router();
const {
  createQuestions,
  getQuestions,
  updateQuestions,
  deleteQuestions } = require('../controllers/controller');

router.route('/')
  .post(createQuestions)
  .get(getQuestions)
  .put(updateQuestions)
  .delete(deleteQuestions);

module.exports = router;