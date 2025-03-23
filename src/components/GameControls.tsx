import React from 'react';
import { Difficulty, Operation } from '../types';
import { Star, Award, Brain } from 'lucide-react';

interface GameControlsProps {
  difficulty: Difficulty;
  operation: Operation;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onOperationChange: (operation: Operation) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  difficulty,
  operation,
  onDifficultyChange,
  onOperationChange,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 p-2 sm:p-4 bg-white rounded-xl shadow-md">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onDifficultyChange('pemula')}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full ${
            difficulty === 'pemula'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Star size={16} className="sm:w-5 sm:h-5" /> Pemula
        </button>
        <button
          onClick={() => onDifficultyChange('menengah')}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full ${
            difficulty === 'menengah'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Award size={16} className="sm:w-5 sm:h-5" /> Menengah
        </button>
        <button
          onClick={() => onDifficultyChange('lanjutan')}
          className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full ${
            difficulty === 'lanjutan'
              ? 'bg-red-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          <Brain size={16} className="sm:w-5 sm:h-5" /> Lanjutan
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {(['tambah', 'kurang', 'kali', 'bagi'] as Operation[]).map((op) => (
          <button
            key={op}
            onClick={() => onOperationChange(op)}
            className={`px-2 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-full ${
              operation === op
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameControls;