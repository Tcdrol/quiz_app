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
  <div className="question-container">
    <div className="question-count">Question {current + 1} of {total}</div>
    <h2 className="question-text">{question.question}</h2>
    <div className="options-container">
      {question.options.map((opt, idx) => (
        <button
          key={idx}
          className={`option-button ${selected === idx ? 'selected' : ''}`}
          onClick={() => onSelect(idx)}
          disabled={selected !== null}
        >
          {opt}
        </button>
      ))}
    </div>
    <button
      className="next-button"
      onClick={onNext}
      disabled={selected === null}
    >
      {current + 1 === total ? "Finish" : "Next"}
    </button>
  </div>
);

export default QuizScreen;
