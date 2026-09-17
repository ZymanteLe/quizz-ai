"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressBar from "@/components/progressBar";
import { ChevronLeft, X } from "lucide-react";
import ResultCard from "@/quizz/ResultCard";
import QuizzSubmission from "@/quizz/QuizzSubmission";

const questions = [
  {
    questionText: "What is React?",
    answers: [
      {
        answerText: "A JavaScript library for building user interfaces",
        isCorrect: true,
        id: 1,
      },
      {
        answerText:
          "A JavaScript framework for building single-page applications",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A programming language",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A CSS framework",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is Next.js?",
    answers: [
      {
        answerText:
          "A React framework for building server-side rendered applications",
        isCorrect: true,
        id: 1,
      },
      {
        answerText: "A JavaScript library for building user interfaces",
        isCorrect: false,
        id: 2,
      },
      {
        answerText: "A programming language",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "A CSS framework",
        isCorrect: false,
        id: 4,
      },
    ],
  },
  {
    questionText: "What is the difference between React and Next.js?",
    answers: [
      {
        answerText:
          "React is a library for building user interfaces, while Next.js is a framework for building server-side rendered applications",
        isCorrect: true,

        id: 1,
      },
      {
        answerText:
          "React is a programming language, while Next.js is a JavaScript library",
        isCorrect: false,
        id: 2,
      },
      {
        answerText:
          "React is a CSS framework, while Next.js is a JavaScript library",
        isCorrect: false,
        id: 3,
      },
      {
        answerText: "React and Next.js are the same thing",
        isCorrect: false,
        id: 4,
      },
    ],
  },
];

export default function Home() {
  const [started, setStarted] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleNext = () => {
    if (!started) {
      setStarted(true);
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setSubmitted(true);
      return
    }

    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer.id);
    const isCurrentCorrect = answer.isCorrect;
    if (isCurrentCorrect) {
      setScore(score + 1);
    }
    setIsCorrect(isCurrentCorrect);
  };

  const scorePercentage: number = Math.round((score / questions.length) * 100);

  if (submitted) {
    return <QuizzSubmission score={score} scorePercentage={scorePercentage} totalQuestions={questions.length}/>
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="position-sticky top-0 z-10 shadow-md py-4 w-full">
        <header className="grid grid-cols-[auto,1fr,auto] grid-flow-col items-center justfy-between py-2">
          <Button
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <ProgressBar
            value={((currentQuestion + 1) / questions.length) * 100}
          />
          <Button
            size="icon"
            variant="outline"
          >
            <X />
          </Button>
        </header>
      </div>
      <main className="flex justify-center flex-1">
        {!started ? (
          <h1 className="text-3xl font-bold">Hello World👋</h1>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">
              {questions[currentQuestion].questionText}
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-6">
              {questions[currentQuestion].answers.map((answer) => {
                const variant =
                  selectedAnswer === answer.id
                    ? answer.isCorrect
                      ? "neoSuccess"
                      : "neoDanger"
                    : "neoOutline";
                return (
                  <Button
                    key={answer.id}
                    variant={variant}
                    size="xl"
                    className="h-auto min-h-10 w-full whitespace-normal px-4 py-3 text-center"
                    onClick={() => handleAnswer(answer)}
                  >
                    <p className="whitespace-normal">{answer.answerText}</p>
                    
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </main>
      <footer className="footer pb-9 px-6 relative mb-0">
        <ResultCard
          isCorrect={isCorrect}
          correctAnswer={
            questions[currentQuestion].answers.find(
              (answer) => answer.isCorrect === true,
            )?.answerText
          }
        />
        <Button
          variant="neo"
          size="lg"
          onClick={handleNext}
        >
          {!started ? "Start" : (currentQuestion === questions.length - 1 ? 'Submit' :"Next")}
        </Button>
      </footer>
    </div>
  );
}
