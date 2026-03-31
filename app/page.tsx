import { prisma } from "@/lib/db";
import { getChoices, getQuestions, getQuestionsToday } from "./api/getters";

import Navbar from "./components/navbar";
import QuestionBlock from "./components/question-block";

export default async function Home() {
  const questions = await getQuestions(); //getQuestionsToday();
  return (
    <div className="">
      <Navbar />
      {/* Label */}
      <section>
        <h2>Daily Dilemmas</h2>
        <p>Choose your path and see what the world thinks.</p>
      </section>
      {questions?.map((question) => (
        <QuestionBlock key={question.id} question={question} />
      ))}
    </div>
  );
}
