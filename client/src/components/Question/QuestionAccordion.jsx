import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import React, { useState } from 'react'

const QuestionAccordion = ({ question, openedQuestion, handleClick, isOpen }) => {
  const [openedTestCase, setOpenedTestCase] = useState(-1);
  const difficulty = [
    {
      level: "Easy",
      color: "text-green-500"
    },
    {
      level: "Medium",
      color: "text-yellow-800"
    },
    {
      level: "Hard",
      color: "text-red-300"
    }
  ];
  return (
    <Accordion open={isOpen} className='mb-2 rounded-lg border shadow-sm px-4'>
      <AccordionHeader
        onClick={() => openedQuestion === question.title ? handleClick("") : handleClick(question.title)}
        className='text-lg border-b-0'>
        <div className='flex items-center w-full justify-between'>
          <p>{question.title}</p>
          <p className={'text-sm ' + difficulty[question.difficulty].color}>
            {difficulty[question.difficulty].level}
          </p>
        </div>
      </AccordionHeader>
      <AccordionBody className='border-t-2'>
        {question.desc}

        {/* RENDERING ALL THE TEST CASES */}
        {question.testCases.map((testCase, index) => (
          <Accordion open={index == openedTestCase} key={index}>
            <AccordionHeader
              onClick={() => openedTestCase === index ? setOpenedTestCase(-1) : setOpenedTestCase(index)} className='text-sm'>
              Test case {index}
            </AccordionHeader>
            <AccordionBody>
              <pre>
                {testCase}
              </pre>
            </AccordionBody>
          </Accordion>
        ))}

      </AccordionBody>
    </Accordion>
  )
}

export default QuestionAccordion