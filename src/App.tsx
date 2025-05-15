import './App.css'
import QuizScreen from './components/QuizScreen'
import ResultScreen from './components/ResultScreen'

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
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Quiz Application</h1>
        {!isQuizComplete ? (
          <QuizScreen onQuizComplete={handleQuizComplete} />
        ) : (
          <ResultScreen score={score} onRestart={handleRestartQuiz} />
        )}
      </div>
      // am not sure what to do
    </div>
  )
}

export default App
