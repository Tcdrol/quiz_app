import React from "react";

export type Question = {
  question: string;
  options: string[];
  answer: number; // index of correct option
};

type Props = {
  question: Question;
  current: number;
  total: number;
  selected: number | null;
  onSelect: (idx: number) => void;
  onNext: () => void;
};

const QuizScreen: React.FC<Props> = ({ question, current, total, selected, onSelect, onNext }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
      <div className="mb-4 text-gray-500 text-sm">Question {current + 1} of {total}</div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">{question.question}</h2>
      <div className="flex flex-col gap-4 mb-6">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded border text-left transition font-medium ${selected === idx ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50"}`}
            onClick={() => onSelect(idx)}
            disabled={selected !== null}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        className="w-full py-2 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition disabled:opacity-50"
        onClick={onNext}
        disabled={selected === null}
      >
        {current + 1 === total ? "Finish" : "Next"}
      </button>
    </div>
  </div>
);

export default QuizScreen;
