import React, { useState, useEffect } from 'react';
import { Difficulty, Operation, Question, GameState } from './types';
import MathProblem from './components/MathProblem';
import AnswerOptions from './components/AnswerOptions';
import GameControls from './components/GameControls';
import ProgressBar from './components/ProgressBar';
import { generateQuestion } from './utils/mathUtils';
import { Trophy, RefreshCw, ChevronDown, ChevronUp, Calculator } from 'lucide-react';

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

  useEffect(() => {
    const newQuestion = generateQuestion(gameState.difficulty, gameState.operation);
    setCurrentQuestion(newQuestion);
    if (!gameCompleted && gameState.pertanyaanSekarang <= gameState.totalPertanyaan) {
      setQuestions(prev => {
        if (prev.length < gameState.pertanyaanSekarang) {
          return [...prev, newQuestion];
        }
        return prev;
      });
    }
  }, [gameState.difficulty, gameState.operation, gameState.pertanyaanSekarang]);

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

  const handleAnswerSelect = (selectedAnswer: number) => {
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
        setCurrentQuestion(generateQuestion(gameState.difficulty, gameState.operation));
      } else {
        setGameCompleted(true);
      }
    }, 2000);
  };

  const handleDifficultyChange = (difficulty: Difficulty) => {
    setGameState(prev => ({ ...prev, difficulty, pertanyaanSekarang: 1, skor: 0, bintang: 0 }));
    setQuestions([]);
    setGameCompleted(false);
  };

  const handleOperationChange = (operation: Operation) => {
    setGameState(prev => ({ ...prev, operation, pertanyaanSekarang: 1, skor: 0, bintang: 0 }));
    setQuestions([]);
    setGameCompleted(false);
  };

  const operationSymbols: Record<Operation, string> = {
    tambah: '+',
    kurang: '-',
    kali: '×',
    bagi: '÷',
  };

  const renderDetailedSolution = (question: Question) => {
    if (question.operation === 'tambah') {
      if (gameState.difficulty === 'lanjutan') {
        // Metode Kompensasi untuk tingkat lanjutan
        const nearestHundred = Math.ceil(question.num1 / 100) * 100;
        const difference = nearestHundred - question.num1;
        const tempResult = nearestHundred + question.num2;
        
        return (
          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-600 font-medium mb-2">
              💡 Konsep: Mari gunakan Metode Kompensasi untuk mempermudah perhitungan
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ✅ Contoh: {question.num1} + {question.num2}
              </p>
              
              <div className="ml-4 space-y-3">
                <p className="text-gray-700">
                  1. Ubah {question.num1} → {nearestHundred} (lebih mudah dijumlahkan)
                </p>
                <div className="bg-yellow-50 p-2 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    Kita menambahkan {difference} untuk membulatkan ke atas
                  </p>
                </div>
                
                <p className="text-gray-700">
                  2. {nearestHundred} + {question.num2} = {tempResult}
                </p>
                
                <p className="text-gray-700">
                  3. Karena kita menambah {difference} ke {question.num1}, kurangkan kembali:
                </p>
                <p className="text-gray-700 ml-4">
                  {tempResult} - {difference} = {question.answer}
                </p>
              </div>
              
              <div className="border-t border-blue-200 pt-3">
                <p className="text-blue-700">
                  ✨ Cara ini lebih cepat daripada menjumlahkan langsung!
                </p>
                <p className="text-blue-700 font-medium">
                  Jadi, {question.num1} + {question.num2} = {question.answer}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        // Metode visualisasi dengan batu untuk pemula dan menengah
        return (
          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-600 font-medium mb-2">
              💡 Konsep: Mari kita gunakan batu untuk memahami penjumlahan
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ✅ Contoh: {question.num1} + {question.num2}
              </p>
              
              <div className="ml-4 space-y-3">
                <p className="text-gray-700">
                  1. Ambil {question.num1} batu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.num1)].map((_, i) => (
                    <span key={i} className="text-xl">🪨</span>
                  ))}
                </div>
                
                <p className="text-gray-700">
                  2. Tambahkan {question.num2} batu lagi:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.num2)].map((_, i) => (
                    <span key={i} className="text-xl bg-yellow-100 p-1 rounded">🪨</span>
                  ))}
                </div>

                <p className="text-gray-700">
                  3. Hitung semua batu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.answer)].map((_, i) => (
                    <span key={i} className={`text-xl ${i < question.num1 ? '' : 'bg-yellow-100 p-1 rounded'}`}>🪨</span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-blue-200 pt-3">
                <p className="text-blue-700">
                  ✨ Total batu sekarang: {question.answer}
                </p>
                <p className="text-blue-700 font-medium">
                  Jadi, {question.num1} + {question.num2} = {question.answer}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }

    if (question.operation === 'kurang') {
      if (gameState.difficulty === 'lanjutan') {
        // Metode Kompensasi untuk tingkat lanjutan
        const nearestHundred = Math.ceil(question.num2 / 100) * 100;
        const difference = nearestHundred - question.num2;
        
        return (
          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-600 font-medium mb-2">
              💡 Konsep: Mari gunakan Metode Kompensasi untuk mempermudah perhitungan
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ✅ Contoh: {question.num1} - {question.num2}
              </p>
              
              <div className="ml-4 space-y-3">
                <p className="text-gray-700">
                  1. Ubah {question.num2} → {nearestHundred} (lebih mudah dikurangkan)
                </p>
                <div className="bg-yellow-50 p-2 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    Kita menambahkan {difference} untuk membulatkan ke atas
                  </p>
                </div>
                
                <p className="text-gray-700">
                  2. {question.num1} - {nearestHundred} = {question.num1 - nearestHundred}
                </p>
                
                <p className="text-gray-700">
                  3. Karena kita menambah {difference} ke {question.num2}, tambahkan kembali ke hasil:
                </p>
                <p className="text-gray-700 ml-4">
                  {question.num1 - nearestHundred} + {difference} = {question.answer}
                </p>
              </div>
              
              <div className="border-t border-blue-200 pt-3">
                <p className="text-blue-700">
                  ✨ Cara ini lebih cepat daripada mengurangkan langsung!
                </p>
                <p className="text-blue-700 font-medium">
                  Jadi, {question.num1} - {question.num2} = {question.answer}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        // Metode visualisasi dengan batu untuk pemula dan menengah
        return (
          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-600 font-medium mb-2">
              💡 Konsep: Mari kita gunakan batu untuk memahami pengurangan
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ✅ Contoh: {question.num1} - {question.num2}
              </p>
              
              <div className="ml-4 space-y-3">
                <p className="text-gray-700">
                  1. Mulai dengan {question.num1} batu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.num1)].map((_, i) => (
                    <span key={i} className="text-xl">🪨</span>
                  ))}
                </div>
                
                <p className="text-gray-700">
                  2. Ambil {question.num2} batu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.num1)].map((_, i) => (
                    <span key={i} className={`text-xl ${i >= question.num1 - question.num2 ? 'opacity-25' : ''}`}>🪨</span>
                  ))}
                </div>

                <p className="text-gray-700">
                  3. Hitung sisa batu:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.answer)].map((_, i) => (
                    <span key={i} className="text-xl">🪨</span>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-blue-200 pt-3">
                <p className="text-blue-700">
                  ✨ Sisa batu: {question.answer}
                </p>
                <p className="text-blue-700 font-medium">
                  Jadi, {question.num1} - {question.num2} = {question.answer}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }

    if (question.operation === 'kali') {
      const tens = Math.floor(question.num2 / 10) * 10;
      const ones = question.num2 % 10;
      
      return (
        <div className="mt-4 bg-blue-50 p-4 rounded-xl">
          <p className="text-blue-600 font-medium mb-2">Mari kita selesaikan menggunakan Sifat Distributif:</p>
          
          <div className="space-y-3">
            <p className="text-gray-600">
              Kita bisa memecah {question.num2} menjadi: {tens} + {ones}
            </p>
            
            <div className="ml-4 space-y-2">
              <p className="text-gray-700">
                Bagian pertama: {question.num1} × {tens} = {question.num1 * tens}
              </p>
              <p className="text-gray-700">
                Bagian kedua: {question.num1} × {ones} = {question.num1 * ones}
              </p>
            </div>
            
            <div className="border-t border-blue-200 pt-2">
              <p className="text-blue-700 font-medium">
                Sekarang tambahkan bagian-bagiannya:
              </p>
              <p className="text-blue-700">
                {question.num1 * tens} + {question.num1 * ones} = {question.answer}
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    if (question.operation === 'bagi') {
      if (gameState.difficulty === 'lanjutan') {
        // Metode Estimasi dan Dekomposisi untuk tingkat lanjutan
        const nearestTen = Math.floor(question.num2 / 10) * 10;
        const firstMultiplier = Math.floor(question.num1 / nearestTen);
        const firstStep = nearestTen * firstMultiplier;
        const remaining = question.num1 - firstStep;
        const secondMultiplier = Math.floor(remaining / question.num2);
        const finalRemaining = remaining - (question.num2 * secondMultiplier);
        
        return (
          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-600 font-medium mb-2">
              💡 Konsep: Mari gunakan Metode Estimasi dan Dekomposisi
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ✅ Contoh: {question.num1} ÷ {question.num2}
              </p>
              
              <div className="ml-4 space-y-3">
                <p className="text-gray-700">
                  1. Gunakan angka yang dekat dengan {question.num2} → {nearestTen}
                </p>
                
                <p className="text-gray-700">
                  2. {nearestTen} × {firstMultiplier} = {firstStep} (mendekati {question.num1})
                </p>
                
                <p className="text-gray-700">
                  3. Sisa: {question.num1} - {firstStep} = {remaining}
                </p>
                
                {remaining > 0 && (
                  <>
                    <p className="text-gray-700">
                      4. {question.num2} × {secondMultiplier} = {question.num2 * secondMultiplier}
                    </p>
                    
                    <p className="text-gray-700">
                      5. Sisa akhir: {finalRemaining}
                    </p>
                  </>
                )}
              </div>
              
              <div className="border-t border-blue-200 pt-3">
                <p className="text-blue-700">
                  ✨ Total hasil: {firstMultiplier} + {secondMultiplier} = {question.answer}
                  {finalRemaining > 0 ? ` (dengan sisa ${finalRemaining})` : ''}
                </p>
                <p className="text-blue-700 font-medium">
                  Jadi, {question.num1} ÷ {question.num2} = {question.answer}
                  {finalRemaining > 0 ? ` dengan sisa ${finalRemaining}` : ''}
                </p>
              </div>
            </div>
          </div>
        );
      } else {
        // Metode visualisasi untuk pemula dan menengah
        return (
          <div className="mt-4 bg-blue-50 p-4 rounded-xl">
            <p className="text-blue-600 font-medium mb-2">
              💡 Konsep: Mari kita selesaikan dengan membagi objek dalam kelompok yang sama
            </p>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                ✅ Contoh: {question.num1} ÷ {question.num2}
              </p>
              
              <div className="ml-4 space-y-3">
                <p className="text-gray-700">
                  Gambarkan {question.num1} apel:
                </p>
                <div className="flex flex-wrap gap-2">
                  {[...Array(question.num1)].map((_, i) => (
                    <span key={i} className="text-xl">🍎</span>
                  ))}
                </div>
                
                <p className="text-gray-700">
                  Buat {question.num2} kelompok:
                </p>
                <div className="space-y-2">
                  {[...Array(question.num2)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex items-center gap-2 bg-white p-2 rounded-lg">
                      <span className="text-gray-600">Kelompok {groupIndex + 1}:</span>
                      <div className="flex gap-1">
                        {[...Array(question.answer)].map((_, itemIndex) => (
                          <span key={itemIndex} className="text-xl">🍎</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t border-blue-200 pt-3">
                <p className="text-blue-700">
                  ✨ Setiap kelompok mendapatkan {question.answer} apel.
                </p>
                <p className="text-blue-700 font-medium">
                  Jadi, {question.num1} ÷ {question.num2} = {question.answer}
                </p>
              </div>
            </div>
          </div>
        );
      }
    }
    
    return null;
  };

  if (gameCompleted) {
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
                    {(q.operation === 'kali' || q.operation === 'bagi') && renderDetailedSolution(q)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-4 px-2 sm:py-8 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <img src="/src/public/logo.webp" alt="Math Kembar Listrik" className="w-8 h-8 sm:w-12 sm:h-12" />
            <h1 className="text-2xl sm:text-4xl font-bold text-blue-600">Math Kembar Listrik</h1>
          </div>
          <p className="text-gray-600 text-base sm:text-lg">Let's make learning math fun! 🌟</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
          <GameControls
            difficulty={gameState.difficulty}
            operation={gameState.operation}
            onDifficultyChange={handleDifficultyChange}
            onOperationChange={handleOperationChange}
          />
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
          <ProgressBar
            current={gameState.pertanyaanSekarang}
            total={gameState.totalPertanyaan}
            stars={gameState.bintang}
          />
        </div>

        {currentQuestion && (
          <div className="bg-white rounded-3xl shadow-xl p-4 sm:p-8 mb-4 sm:mb-8">
            <MathProblem
              num1={currentQuestion.num1}
              num2={currentQuestion.num2}
              operation={currentQuestion.operation}
            />
            <AnswerOptions
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
}

export default App;