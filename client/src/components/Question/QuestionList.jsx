import React from 'react'

const QuestionList = ({ questionList }) => {
  return (
    <ul>
      {
        questionList.map((question) => (
          <li key={question.title}>
            Title: {question.title} <br />
            Desc: {question.desc}
          </li>
        ))
      }
    </ul>
  )
}

QuestionList.defaultProps = {
  questionList: []
}

export default QuestionList