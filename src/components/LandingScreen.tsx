import React from "react";

type Props = {
  onStart: () => void;
};

const LandingScreen: React.FC<Props> = ({ onStart }) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
    <h1 className="text-4xl font-bold mb-4 text-gray-800">Quiz App</h1>
    <p className="mb-8 text-lg text-gray-600">Test your knowledge in a fun way!</p>
    <button
      className="px-8 py-3 rounded bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
      onClick={onStart}
    >
      Start Quiz
    </button>
  </div>
);

export default LandingScreen;
