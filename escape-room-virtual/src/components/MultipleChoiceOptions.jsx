// src/components/MultipleChoiceOptions.js
import React from 'react';

function MultipleChoiceOptions({ options, onOptionSelect }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionSelect(option)}
          className="bg-gray-700 p-6 rounded-md shadow-lg text-black font-bold text-center
                     flex items-center justify-center cursor-pointer
                     hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105
                     border border-gray-600 hover:border-blue-800"
          style={{ minHeight: '100px' }} // Assicura un'altezza consistente per le opzioni
        >
          <span className="text-lg">{option}</span>
        </button>
      ))}
    </div>
  );
}

export default MultipleChoiceOptions;
