import { useState, useEffect } from 'react';
import './App.css';
import QuizScreen, { Question } from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import quizData from './components/quizData';

// Function to get a random subset of questions
const getRandomQuestions = (questions: Question[], count: number): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

function App() {
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);

  // Initialize quiz with random questions
  useEffect(() => {
    const randomQuestions = getRandomQuestions(quizData, 10);
    setCurrentQuizQuestions(randomQuestions);
  }, []);

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setIsQuizComplete(true);
  };

  const handleRestartQuiz = () => {
    const randomQuestions = getRandomQuestions(quizData, 10);
    setCurrentQuizQuestions(randomQuestions);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserScore(0);
    setIsQuizComplete(false);
  };

  const handleSelect = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const handleNext = () => {
    if (selectedAnswer === currentQuizQuestions[currentQuestion]?.answer) {
      setUserScore(prevScore => prevScore + 1);
    }
    
    if (currentQuestion < currentQuizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = selectedAnswer === currentQuizQuestions[currentQuestion]?.answer ? userScore + 1 : userScore;
      handleQuizComplete(finalScore);
    }
  };

  return (
    <div className="app-container">
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz Application</h1>
        {!isQuizComplete ? (
          currentQuizQuestions.length > 0 ? (
            <QuizScreen 
              question={currentQuizQuestions[currentQuestion]} 
              current={currentQuestion}
              total={currentQuizQuestions.length}
              selected={selectedAnswer}
              onSelect={handleSelect}
              onNext={handleNext}
            />
          ) : (
            <div>Loading questions...</div>
          )
        ) : (
          <ResultScreen 
            score={score} 
            total={currentQuizQuestions.length}
            onRestart={handleRestartQuiz} 
          />
        )}
      </div>
    </div>
  )
}

export default App
