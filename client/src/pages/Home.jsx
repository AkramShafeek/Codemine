import { useEffect, useState } from "react"
import { fetchQuestionsFromApi } from "../services/api";
import QuestionList from "../components/Question/QuestionList";

const Home = () => {

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const questions = await fetchQuestionsFromApi();
      setQuestions(questions);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    console.log(questions);
  }, [questions]);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-lg text-blue-gray-900 font-bold mb-3">Your Questions</h1>
      <QuestionList questionList={questions} />
    </div>
  )
}

export default Home