import React from "react";

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

const ResultScreen: React.FC<Props> = ({ score, total, onRestart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Quiz Completed!</h2>
      <p className="text-lg mb-6 text-gray-600">Your Score:</p>
      <div className="text-5xl font-extrabold text-blue-600 mb-6">{score} / {total}</div>
      <button
        className="px-8 py-3 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
        onClick={onRestart}
      >
        Try Again
      </button>
    </div>
  </div>
);

export default ResultScreen;
