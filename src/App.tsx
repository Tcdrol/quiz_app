import { useState, useEffect } from 'react';
import './App.css';
import QuizScreen, { Question } from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import { generateAIQuestions } from './services/openai';
import { csQuestions } from './data/csQuestions';

// Fallback questions when AI service is unavailable
const getLocalQuestions = (topic: string, count: number) => {
  console.log(`Using local questions for topic: ${topic}`);
  // For now, we'll use the CS questions as our fallback
  // In a real app, you might have different question sets per topic
  const questions = [...csQuestions];
  
  // Shuffle the questions and return the requested number
  return questions
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, questions.length));
};

function App() {
  console.log('App component rendering...');
  
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userScore, setUserScore] = useState(0);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);
  const [topic, setTopic] = useState('React and JavaScript');

  // Debug effect to log state changes
  useEffect(() => {
    console.log('Current state:', {
      isLoading,
      error,
      topic,
      currentQuizQuestions: currentQuizQuestions.length,
      currentQuestion,
      isQuizComplete,
      selectedAnswer
    });
  });

  // Initialize quiz with AI-generated questions or fallback to local questions
  useEffect(() => {
    let isMounted = true;
    
    const fetchQuestions = async () => {
      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
          console.log('Fetching AI-generated questions for topic:', topic);
          
          // Add a small delay to show loading state
          await new Promise(resolve => setTimeout(resolve, 500));
          
          try {
            const questions = await generateAIQuestions(topic, 10);
            console.log('Successfully received AI-generated questions');
            
            if (isMounted) {
              if (!questions || !Array.isArray(questions) || questions.length === 0) {
                throw new Error('No questions were generated');
              }
              setCurrentQuizQuestions(questions);
            }
          } catch (aiError) {
            console.warn('Falling back to local questions due to AI service error:', aiError);
            // Fall back to local questions if AI fails
            const localQuestions = getLocalQuestions(topic, 10);
            if (isMounted) {
              setCurrentQuizQuestions(localQuestions);
              setError('Using local questions (AI service unavailable)');
              // Clear the error after a short delay
              setTimeout(() => setError(null), 3000);
            }
          }
        }
      } catch (err: unknown) {
        console.error('Failed to load questions:', err);
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Unknown error';
          setError(`Failed to load questions: ${errorMessage}`);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();
    
    return () => {
      isMounted = false;
    };
  }, [topic]);

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setIsQuizComplete(true);
  };

  const handleRestartQuiz = async () => {
    try {
      setIsLoading(true);
      const questions = await generateAIQuestions(topic, 10);
      setCurrentQuizQuestions(questions);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setUserScore(0);
      setIsQuizComplete(false);
      setError(null);
    } catch (err) {
      console.error('Failed to generate new questions:', err);
      setError('Failed to generate new questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
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


  
  if (isLoading) {
    return (
      <div className="app-container">
        <div className="quiz-container">
          <h1 className="quiz-title">Quiz Application</h1>
          <div className="loading">
            <div className="spinner"></div>
            <p>Generating your quiz questions about {topic}...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="quiz-container">
          <h1 className="quiz-title">Quiz Application</h1>
          <div className="error">
            {error}
            <button className="retry-button" onClick={handleRestartQuiz}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz Application</h1>
        <div className="topic-selector">
          <label htmlFor="topic">Topic: </label>
          <select 
            id="topic" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={!isQuizComplete}
          >
            <option value="React and JavaScript">React and JavaScript</option>
            <option value="Python">Python</option>
            <option value="Data Structures and Algorithms">Data Structures</option>
            <option value="Web Development">Web Development</option>
          </select>
        </div>
        
        {!isQuizComplete ? (
          <QuizScreen 
            question={currentQuizQuestions[currentQuestion]} 
            current={currentQuestion}
            total={currentQuizQuestions.length}
            selected={selectedAnswer}
            onSelect={handleSelect}
            onNext={handleNext}
          />
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
