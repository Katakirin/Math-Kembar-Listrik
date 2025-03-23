import { FC } from 'react';
import { Question } from '../../types';

interface AdditionSolutionProps {
  question: Question;
  difficulty: 'pemula' | 'menengah' | 'lanjutan';
}

const AdditionSolution: FC<AdditionSolutionProps> = ({ question, difficulty }) => {
  if (difficulty === 'pemula') {
    return (
      <div className="mt-4 bg-blue-50 p-4 rounded-xl">
        <p className="text-blue-600 font-medium mb-2">
          💡 Konsep: Menggunakan apel untuk memahami penjumlahan
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} + {question.num2}
          </p>
          
          <div className="ml-4 space-y-6">
            {/* Langkah 1: Apel pertama */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-3">
                1. Letakkan {question.num1} apel di sisi kiri:
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-wrap gap-2 p-4 bg-green-50 rounded-lg border-2 border-dashed border-green-200 min-w-[200px]">
                  {[...Array(question.num1)].map((_, i) => (
                    <span key={i} className="text-3xl">🍎</span>
                  ))}
                </div>
                <div className="text-lg text-gray-500">Sisi Kiri</div>
              </div>
            </div>
            
            {/* Langkah 2: Apel kedua */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-3">
                2. Letakkan {question.num2} apel di sisi kanan:
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-wrap gap-2 p-4 bg-yellow-50 rounded-lg border-2 border-dashed border-yellow-200 min-w-[200px]">
                  {[...Array(question.num2)].map((_, i) => (
                    <span key={i} className="text-3xl">🍎</span>
                  ))}
                </div>
                <div className="text-lg text-gray-500">Sisi Kanan</div>
              </div>
            </div>

            {/* Langkah 3: Hitung semua apel */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-3">
                3. Sekarang, mari hitung semua apel:
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2 p-4 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                  {[...Array(question.answer)].map((_, i) => (
                    <span key={i} className="text-3xl">
                      🍎
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-6">
            <p className="text-blue-700 font-medium mb-2">
              ✨ Mari hitung bersama-sama:
            </p>
            <div className="space-y-2 text-lg">
              <p className="text-gray-700">
                • Di sisi kiri ada {question.num1} apel
              </p>
              <p className="text-gray-700">
                • Di sisi kanan ada {question.num2} apel
              </p>
              <p className="text-gray-700 font-medium">
                • Jika dihitung semuanya: {question.num1} + {question.num2} = {question.answer} apel
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (difficulty === 'menengah') {
    return (
      <div className="mt-4 bg-blue-50 p-4 rounded-xl">
        <p className="text-blue-600 font-medium mb-2">
          💡 Konsep: Mari gunakan metode nilai tempat
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} + {question.num2}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-2">Langkah-langkah:</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-medium">Puluhan</p>
                  <p>{Math.floor(question.num1 / 10)}</p>
                  <p>{Math.floor(question.num2 / 10)}</p>
                  <div className="border-t">
                    <p>{Math.floor((question.num1 + question.num2) / 10)}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-medium">Satuan</p>
                  <p>{question.num1 % 10}</p>
                  <p>{question.num2 % 10}</p>
                  <div className="border-t">
                    <p>{(question.num1 + question.num2) % 10}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium">
              Jadi, {question.num1} + {question.num2} = {question.answer}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Level Lanjutan
  const nearestHundred = Math.ceil(question.num1 / 100) * 100;
  const difference = nearestHundred - question.num1;
  const tempResult = nearestHundred + question.num2;

  return (
    <div className="mt-4 bg-blue-50 p-4 rounded-xl">
      <p className="text-blue-600 font-medium mb-2">
        💡 Konsep: Mari gunakan metode kompensasi
      </p>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          ✅ Contoh: {question.num1} + {question.num2}
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="space-y-3">
            <p className="text-gray-700">
              1. Bulatkan {question.num1} ke ratusan terdekat: {nearestHundred}
            </p>
            <p className="text-gray-700">
              2. {nearestHundred} + {question.num2} = {tempResult}
            </p>
            <p className="text-gray-700">
              3. Kurangi dengan selisih pembulatan: {tempResult} - {difference}
            </p>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
          <p className="text-blue-700 font-medium">
            Jadi, {question.num1} + {question.num2} = {question.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditionSolution; 