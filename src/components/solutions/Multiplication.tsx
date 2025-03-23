import { FC } from 'react';
import { Question } from '../../types';

interface MultiplicationSolutionProps {
  question: Question;
  difficulty: 'pemula' | 'menengah' | 'lanjutan';
}

const MultiplicationSolution: FC<MultiplicationSolutionProps> = ({ question, difficulty }) => {
  if (difficulty === 'pemula') {
    return (
      <div className="mt-4 bg-blue-50 p-4 rounded-xl">
        <p className="text-blue-600 font-medium mb-2">
          💡 Konsep: Mari gunakan penjumlahan berulang
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} × {question.num2}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 mb-2">
              Berarti kita menambahkan {question.num1} sebanyak {question.num2} kali:
            </p>
            {[...Array(question.num2)].map((_, i) => (
              <div key={i} className="flex flex-wrap gap-2 p-2">
                {[...Array(question.num1)].map((_, j) => (
                  <span key={j} className="text-2xl">🔵</span>
                ))}
                {i < question.num2 - 1 && <span className="text-2xl">+</span>}
              </div>
            ))}
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium mb-2">
              ✨ Mari hitung bersama-sama:
            </p>
            <div className="space-y-2 text-lg">
              <p className="text-gray-700">
                {question.num1} ditambah {question.num2} kali
              </p>
              <p className="text-gray-700 font-medium">
                {question.num1} × {question.num2} = {question.answer}
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
          💡 Konsep: Mari gunakan metode kotak perkalian
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            ✅ Contoh: {question.num1} × {question.num2}
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-4 p-4 border-2 border-dashed border-blue-200">
              <div className="text-center p-4 bg-blue-50">
                {question.num1}
              </div>
              <div className="text-center p-4 bg-green-50">
                {question.num2}
              </div>
              <div className="col-span-2 text-center p-4 bg-yellow-50">
                = {question.answer}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
            <p className="text-blue-700 font-medium">
              Jadi, {question.num1} × {question.num2} = {question.answer}
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
        💡 Konsep: Mari gunakan metode perkalian bersusun
      </p>
      
      <div className="space-y-4">
        <p className="text-gray-600">
          ✅ Contoh: {question.num1} × {question.num2}
        </p>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="font-mono text-lg space-y-1">
            <p>{question.num1}</p>
            <p>×{question.num2}</p>
            <div className="border-t border-gray-400">
              <p>{question.answer}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm mt-4">
          <p className="text-blue-700 font-medium">
            Jadi, {question.num1} × {question.num2} = {question.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiplicationSolution; 