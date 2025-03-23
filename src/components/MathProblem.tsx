import React from 'react';
import { Operation } from '../types';

interface MathProblemProps {
  num1: number;
  num2: number;
  operation: Operation;
}

const operationSymbols = {
  tambah: '+',
  kurang: '-',
  kali: '×',
  bagi: '÷',
};

const MathProblem: React.FC<MathProblemProps> = ({ num1, num2, operation }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 text-2xl sm:text-4xl font-bold text-indigo-700">
      <span className="bg-yellow-100 p-2 sm:p-4 rounded-xl shadow-sm">{num1}</span>
      <span className="text-pink-500">{operationSymbols[operation]}</span>
      <span className="bg-yellow-100 p-2 sm:p-4 rounded-xl shadow-sm">{num2}</span>
      <span className="text-pink-500">=</span>
      <span className="bg-blue-100 p-2 sm:p-4 rounded-xl shadow-sm animate-bounce">?</span>
    </div>
  );
};

export default MathProblem;