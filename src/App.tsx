import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Difficulty, Operation, Question, GameState } from './types';
import MathProblem from './components/MathProblem';
import AnswerOptions from './components/AnswerOptions';
import GameControls from './components/GameControls';
import ProgressBar from './components/ProgressBar';
import { generateQuestion } from './utils/mathUtils';
import { Trophy, RefreshCw, ChevronDown, ChevronUp, Calculator } from 'lucide-react';
import AdditionSolution from './components/solutions/Addition';
import SubtractionSolution from './components/solutions/Subtraction';
import MultiplicationSolution from './components/solutions/Multiplication';
import DivisionSolution from './components/solutions/Division';

// Fungsi debounce untuk Difficulty
const debounceDifficulty = (func: (difficulty: Difficulty) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(difficulty: Difficulty) {
    const later = () => {
      clearTimeout(timeout);
      func(difficulty);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Fungsi debounce untuk Operation
const debounceOperation = (func: (operation: Operation) => void, wait: number) => {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(operation: Operation) {
    const later = () => {
      clearTimeout(timeout);
      func(operation);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Memoize komponen yang sering di-render
const MemoizedMathProblem = memo(MathProblem);
const MemoizedAnswerOptions = memo(AnswerOptions);
const MemoizedProgressBar = memo(ProgressBar);
const MemoizedGameControls = memo(GameControls);

function App() {
  const [gameState, setGameState] = useState<GameState>({
    skor: 0,
    pertanyaanSekarang: 1,
    totalPertanyaan: 10,
    difficulty: 'pemula' as Difficulty,
    operation: 'tambah' as Operation,
    bintang: 0,
  });

  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showSolutions, setShowSolutions] = useState(false);

  // Memoize operationSymbols
  const operationSymbols = useMemo<Record<Operation, string>>(() => ({
    tambah: '+',
    kurang: '-',
    kali: '×',
    bagi: '÷',
  }), []);

  // Memoize currentQuestion generation
  const generateNewQuestion = useCallback(() => {
    return generateQuestion(gameState.difficulty, gameState.operation);
  }, [gameState.difficulty, gameState.operation]);

  // Optimize useEffect untuk generateQuestion
  useEffect(() => {
    if (!gameCompleted && gameState.pertanyaanSekarang <= gameState.totalPertanyaan) {
      const newQuestion = generateNewQuestion();
      setCurrentQuestion(newQuestion);
      setQuestions(prev => {
        if (prev.length < gameState.pertanyaanSekarang) {
          return [...prev, newQuestion];
        }
        return prev;
      });
    }
  }, [gameState.difficulty, gameState.operation, gameState.pertanyaanSekarang, gameCompleted, generateNewQuestion]);

  // Optimize handleAnswerSelect dengan useCallback
  const handleAnswerSelect = useCallback((selectedAnswer: number) => {
    if (!currentQuestion) return;

    const correct = selectedAnswer === currentQuestion.answer;
    setIsCorrect(correct);

    if (correct) {
      setFeedback('Fantastis! Kamu benar! 🎉');
      setGameState(prev => ({
        ...prev,
        skor: prev.skor + 1,
        bintang: Math.min(prev.bintang + 1, 3),
      }));
    } else {
      setFeedback(`Coba lagi! Jawaban yang benar adalah ${currentQuestion.answer}`);
      setGameState(prev => ({
        ...prev,
        bintang: Math.max(prev.bintang - 1, 0),
      }));
    }

    setTimeout(() => {
      setIsCorrect(null);
      setFeedback('');
      if (gameState.pertanyaanSekarang < gameState.totalPertanyaan) {
        setGameState(prev => ({
          ...prev,
          pertanyaanSekarang: prev.pertanyaanSekarang + 1,
        }));
        setCurrentQuestion(generateNewQuestion());
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  }, [currentQuestion, gameState.pertanyaanSekarang, gameState.totalPertanyaan, generateNewQuestion]);

  const resetGame = () => {
    setGameState({
      skor: 0,
      pertanyaanSekarang: 1,
      totalPertanyaan: 10,
      difficulty: 'pemula',
      operation: 'tambah',
      bintang: 0,
    });
    setGameCompleted(false);
    setQuestions([]);
    setCurrentQuestion(generateQuestion('pemula', 'tambah'));
  };

  const handleDifficultyChange = useCallback(
    debounceDifficulty((difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty, pertanyaanSekarang: 1, skor: 0, bintang: 0 }));
    setQuestions([]);
    setGameCompleted(false);
    }, 300),
    []
  );

  const handleOperationChange = useCallback(
    debounceOperation((operation: Operation) => {
    setGameState(prev => ({ ...prev, operation, pertanyaanSekarang: 1, skor: 0, bintang: 0 }));
    setQuestions([]);
    setGameCompleted(false);
    }, 300),
    []
  );

  // Memoize renderDetailedSolution
  const renderDetailedSolution = useCallback((question: Question) => {
    if (question.operation === 'tambah') {
      return <AdditionSolution question={question} difficulty={gameState.difficulty} />;
    } else if (question.operation === 'kurang') {
      return <SubtractionSolution question={question} difficulty={gameState.difficulty} />;
    } else if (question.operation === 'kali') {
      return <MultiplicationSolution question={question} difficulty={gameState.difficulty} />;
    } else if (question.operation === 'bagi') {
      return <DivisionSolution question={question} difficulty={gameState.difficulty} />;
    }
    return null;
  }, [gameState.difficulty]);

  // Memoize game completed view
  const renderGameCompleted = useCallback(() => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-4 px-2 sm:py-8 sm:px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 text-center mb-4 sm:mb-8">
            <Trophy className="w-16 h-16 sm:w-24 sm:h-24 text-yellow-400 mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-4xl font-bold text-blue-600 mb-3 sm:mb-4">Permainan Selesai! 🎉</h2>
            <p className="text-xl sm:text-2xl text-gray-700 mb-4 sm:mb-6">
              Skor Akhirmu: <span className="font-bold text-green-600">{gameState.skor}</span> / {gameState.totalPertanyaan}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              {[...Array(3)].map((_, i) => (
                <Trophy
                  key={i}
                  size={24}
                  className={i < gameState.bintang ? 'text-yellow-400' : 'text-gray-300'}
                />
              ))}
            </div>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              {gameState.skor === gameState.totalPertanyaan
                ? "Skor sempurna! Kamu luar biasa! 🌟"
                : gameState.skor >= 7
                ? "Kerja bagus! Terus berlatih! 👏"
                : "Usaha yang baik! Coba lagi untuk meningkat! 💪"}
            </p>
            <button
              onClick={resetGame}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded-full mx-auto hover:bg-blue-600 transition-colors duration-200 text-sm sm:text-base"
            >
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5" />
              Main Lagi
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8">
            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className="flex items-center justify-between w-full px-3 sm:px-4 py-2 text-base sm:text-lg font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors duration-200"
            >
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Lihat Solusi</span>
              </div>
              {showSolutions ? <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" /> : <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

            {showSolutions && (
              <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                {questions.map((q, index) => (
                  <div
                    key={index}
                    className="p-3 sm:p-6 rounded-xl bg-white shadow-md border border-blue-100"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg mb-2">
                      <span className="font-semibold text-blue-600">Pertanyaan {index + 1}:</span>
                      <span className="text-lg sm:text-xl">{q.num1}</span>
                      <span className="text-pink-500 text-lg sm:text-xl">{operationSymbols[q.operation]}</span>
                      <span className="text-lg sm:text-xl">{q.num2}</span>
                      <span className="text-pink-500 text-lg sm:text-xl">=</span>
                      <span className="font-bold text-green-600 text-lg sm:text-xl">{q.answer}</span>
                    </div>
                    {renderDetailedSolution(q)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }, [gameState.skor, gameState.bintang, gameState.totalPertanyaan, showSolutions, questions, operationSymbols, renderDetailedSolution]);

  // Memoize main game view
  const renderMainGame = useCallback(() => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <img src="/logo.webp" alt="Math Kembar Listrik" className="w-8 h-8 sm:w-12 sm:h-12" />
            <h1 className="text-2xl sm:text-4xl font-bold text-blue-600">Math Kembar Listrik</h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">Let's make learning math fun! 🌟</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
            <MemoizedGameControls
            difficulty={gameState.difficulty}
            operation={gameState.operation}
            onDifficultyChange={handleDifficultyChange}
            onOperationChange={handleOperationChange}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
            <MemoizedProgressBar
            current={gameState.pertanyaanSekarang}
            total={gameState.totalPertanyaan}
            stars={gameState.bintang}
          />
        </div>

        {currentQuestion && (
          <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
              <MemoizedMathProblem
              num1={currentQuestion.num1}
              num2={currentQuestion.num2}
              operation={currentQuestion.operation}
            />
              <MemoizedAnswerOptions
              options={currentQuestion.options}
              onSelect={handleAnswerSelect}
            />
          </div>
        )}

        {feedback && (
          <div
            className={`text-center p-3 sm:p-4 rounded-xl text-base sm:text-lg font-bold mb-4 sm:mb-8 ${
              isCorrect
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {feedback}
          </div>
        )}

        <div className="text-center text-gray-600 text-sm sm:text-base">
          Score: {gameState.skor} / {gameState.pertanyaanSekarang - 1}
        </div>
      </div>
    </div>
  );
  }, [currentQuestion, feedback, isCorrect, gameState, handleAnswerSelect, handleDifficultyChange, handleOperationChange]);

  return gameCompleted ? renderGameCompleted() : renderMainGame();
}

export default App;