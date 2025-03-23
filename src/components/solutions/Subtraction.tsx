import { FC } from 'react';
import { Question } from '../../types';

interface SubtractionSolutionProps {
  question: Question;
  difficulty: 'pemula' | 'menengah' | 'lanjutan';
}

const SubtractionSolution: FC<SubtractionSolutionProps> = ({ question, difficulty }) => {
  if (difficulty === 'pemula') {
    return (
      <div className="mt-4 bg-blue-50 p-4 rounded-xl">
        <p className="text-blue-600 font-medium mb-2">
          💡 Konsep: Mari kita gunakan benda untuk memahami pengurangan
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} - {question.num2}
          </p>
          
          <div className="ml-4 space-y-3">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-2">
                1. Mulai dengan {question.num1} apel:
              </p>
              <div className="flex flex-wrap gap-2 p-3 bg-green-50 rounded-lg border-2 border-dashed border-green-200">
                {[...Array(question.num1)].map((_, i) => (
                  <span key={i} className="text-2xl transform hover:scale-110 transition-transform">🍎</span>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-2">
                2. Ambil {question.num2} apel:
              </p>
              <div className="flex flex-wrap gap-2 p-3 bg-red-50 rounded-lg border-2 border-dashed border-red-200">
                {[...Array(question.num2)].map((_, i) => (
                  <span key={i} className="text-2xl transform hover:scale-110 transition-transform line-through">🍎</span>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-700 mb-2">
                3. Sisa apel yang ada:
              </p>
              <div className="flex flex-wrap gap-2 p-3 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                {[...Array(question.answer)].map((_, i) => (
                  <span key={i} className="text-2xl transform hover:scale-110 transition-transform">🍎</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium mb-2">
              ✨ Mari hitung bersama-sama:
            </p>
            <div className="space-y-2 text-lg">
              <p className="text-gray-700">
                • Awalnya ada {question.num1} apel
              </p>
              <p className="text-gray-700">
                • Diambil {question.num2} apel
              </p>
              <p className="text-gray-700 font-medium">
                • Sisa apel: {question.num1} - {question.num2} = {question.answer} apel
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
            ✅ Contoh: {question.num1} - {question.num2}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-2">Langkah-langkah:</p>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="font-medium">Puluhan</p>
                  <p>{Math.floor(question.num1 / 10)}</p>
                  <p className="text-red-500">-{Math.floor(question.num2 / 10)}</p>
                  <div className="border-t">
                    <p>{Math.floor((question.num1 - question.num2) / 10)}</p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-medium">Satuan</p>
                  <p>{question.num1 % 10}</p>
                  <p className="text-red-500">-{question.num2 % 10}</p>
                  <div className="border-t">
                    <p>{(question.num1 - question.num2) % 10}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium">
              Jadi, {question.num1} - {question.num2} = {question.answer}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Level Lanjutan
  return (
    <div className="mt-4 bg-blue-50 p-4 rounded-xl">
      <p className="text-blue-600 font-medium mb-2">
        💡 Konsep: Mari gunakan metode peminjaman
      </p>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          ✅ Contoh: {question.num1} - {question.num2}
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="space-y-3">
            <p className="text-gray-700">
              1. Susun bilangan secara bersusun
            </p>
            <div className="font-mono text-lg space-y-1">
              <p>{question.num1}</p>
              <p>-{question.num2}</p>
              <div className="border-t border-gray-400">
                <p>{question.answer}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
          <p className="text-blue-700 font-medium">
            Jadi, {question.num1} - {question.num2} = {question.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubtractionSolution; 