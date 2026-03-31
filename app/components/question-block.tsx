interface Question {
  id: string;
  content: string;
  slot: string;
}

export default function QuestionBlock({ question }: { question: Question }) {
  return (
    <div>
      <h1>{question.content}</h1>
    </div>
  );
}
