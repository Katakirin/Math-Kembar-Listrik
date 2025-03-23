import React from 'react';

interface AnswerOptionsProps {
  options: number[];
  onSelect: (answer: number) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({ options, onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 mt-4 sm:mt-8">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className="bg-white hover:bg-blue-50 text-xl sm:text-2xl font-bold py-2 sm:py-4 px-4 sm:px-8 rounded-xl sm:rounded-2xl 
                   shadow-lg transform hover:scale-105 transition-transform duration-200
                   border-2 sm:border-4 border-blue-200 text-blue-700"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default AnswerOptions;