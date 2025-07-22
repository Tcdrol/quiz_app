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
    <div className="app-container">
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz Application</h1>
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
    </div>
  )
}

export default App
