import axios from "axios";
import { rootApiUrl } from "./config";
import sampleQuestions from "../sample/sampleQuestions.json";

export const fetchQuestionsFromApi = async () => {
  try {
    // later connect to api
    // as of now return sample data
    return sampleQuestions;
  } catch (error) {
    
  }
}
