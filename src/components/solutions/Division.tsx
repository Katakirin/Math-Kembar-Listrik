import { FC } from 'react';
import { Question } from '../../types';

interface DivisionSolutionProps {
  question: Question;
  difficulty: 'pemula' | 'menengah' | 'lanjutan';
}

const DivisionSolution: FC<DivisionSolutionProps> = ({ question, difficulty }) => {
  if (difficulty === 'pemula') {
    return (
      <div className="mt-4 bg-blue-50 p-4 rounded-xl">
        <p className="text-blue-600 font-medium mb-2">
          💡 Konsep: Mari gunakan metode pembagian kelompok
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} ÷ {question.num2}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-2">
              Bagi {question.num1} benda menjadi {question.num2} kelompok:
            </p>
            <div className="space-y-2">
              {[...Array(question.num2)].map((_, i) => (
                <div key={i} className="flex flex-wrap gap-2 p-2 bg-blue-50 rounded-lg">
                  {[...Array(question.answer)].map((_, j) => (
                    <span key={j} className="text-2xl">⭐</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium mb-2">
              ✨ Mari hitung bersama-sama:
            </p>
            <div className="space-y-2 text-lg">
              <p className="text-gray-700">
                • Total benda: {question.num1}
              </p>
              <p className="text-gray-700">
                • Dibagi menjadi {question.num2} kelompok
              </p>
              <p className="text-gray-700 font-medium">
                • Setiap kelompok mendapat: {question.answer} benda
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
          💡 Konsep: Mari gunakan metode pengurangan berulang
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} ÷ {question.num2}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-2">Langkah-langkah:</p>
            <div className="space-y-2">
              {[...Array(question.answer)].map((_, i) => (
                <p key={i} className="text-gray-700">
                  {question.num1 - (i * question.num2)} - {question.num2} = {question.num1 - ((i + 1) * question.num2)}
                </p>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium">
              Jadi, {question.num1} ÷ {question.num2} = {question.answer}
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
        💡 Konsep: Mari gunakan metode pembagian bersusun
      </p>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          ✅ Contoh: {question.num1} ÷ {question.num2}
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="font-mono text-lg space-y-1">
            <div className="flex items-center">
              <span className="mr-2">{question.num2}</span>
              <div>
                <p className="border-l-2 border-t-2 border-black pl-2 pt-2">{question.num1}</p>
                <p className="pl-2">{question.answer}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
          <p className="text-blue-700 font-medium">
            Jadi, {question.num1} ÷ {question.num2} = {question.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DivisionSolution; 