import React, { useState } from 'react'
import QuestionAccordion from './QuestionAccordion'

const QuestionList = ({ questionList }) => {
  const [openedQuestion, setOpenedQuestion] = useState("");
  return (
    <ul>
      {
        questionList.map((question) => (
          <li key={question.title}>
            <QuestionAccordion
              question={question}
              openedQuestion={openedQuestion}
              handleClick={setOpenedQuestion}
              isOpen={openedQuestion === question.title} />
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