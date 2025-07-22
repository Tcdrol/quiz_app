import React from "react";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

const ResultScreen: React.FC<Props> = ({ score, total, onRestart }) => (
  <div className="result-container">
    <h2 className="result-title">Quiz Completed!</h2>
    <p>Your Score:</p>
    <div className="result-score">{score} / {total}</div>
    <button
      className="restart-button"
      onClick={onRestart}
    >
      Try Again
    </button>
  </div>
);

export default ResultScreen;
