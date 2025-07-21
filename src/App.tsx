import { useState } from 'react';
import './App.css';
import QuizScreen, { Question } from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import quizData from './components/quizData';

function App() {
  const [isQuizComplete, setIsQuizComplete] = useState(false)
  const [score, setScore] = useState(0)

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore)
    setIsQuizComplete(true)
  }

  const handleRestartQuiz = () => {
    setIsQuizComplete(false)
    setScore(0)
  }
//nothing big
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);

  const handleSelect = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNext = () => {
    if (selectedAnswer === quizData[currentQuestion].answer) {
      setUserScore(prevScore => prevScore + 1);
    }
    
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizComplete(selectedAnswer === quizData[currentQuestion].answer ? userScore + 1 : userScore);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Quiz Application</h1>
        {!isQuizComplete ? (
          <QuizScreen 
            question={quizData[currentQuestion]} 
            current={currentQuestion}
            total={quizData.length}
            selected={selectedAnswer}
            onSelect={handleSelect}
            onNext={handleNext}
          />
        ) : (
          <ResultScreen 
            score={score} 
            total={quizData.length}
            onRestart={handleRestartQuiz} 
          />
        )}
      </div>
      {/* Additional content or components can go here */}
    </div>
  )
}

export default App
