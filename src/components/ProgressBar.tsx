import React from 'react';
import { Star } from 'lucide-react';

interface ProgressBarProps {
  current: number;
  total: number;
  stars: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total, stars }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs sm:text-sm font-medium text-blue-700">
          Pertanyaan {current} dari {total}
        </span>
        <div className="flex items-center gap-1">
          {[...Array(3)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4">
        <div
          className="bg-blue-500 rounded-full h-3 sm:h-4 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;