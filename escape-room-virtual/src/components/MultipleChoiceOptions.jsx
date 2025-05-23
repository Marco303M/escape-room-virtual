// src/components/MultipleChoiceOptions.jsx
import React, { useState } from 'react';
import { MULTIPLE_CHOICE_FEEDBACK_DURATION_MS } from '../utils/constants'; // Import constants

function MultipleChoiceOptions({ options, correctAnswer, onOptionSelect }) {
  const [selectedOptionState, setSelectedOptionState] = useState(null);
  const [feedbackBorderClass, setFeedbackBorderClass] = useState(''); // Nuovo stato per la classe del bordo

  const handleOptionClick = (option) => {
    // Se un'opzione è già stata selezionata, non fare nulla
    if (selectedOptionState !== null) return;

    setSelectedOptionState(option); // Set the locally selected option
    const isCorrect = option.toLowerCase() === correctAnswer.toLowerCase();

    // Determina la classe del bordo di feedback
    const borderClass = isCorrect ? 'border-green' : 'border-red';
    setFeedbackBorderClass(borderClass);

    // Fornisci feedback visivo per una breve durata
    setTimeout(() => {
      setFeedbackBorderClass(''); // Rimuovi il bordo di feedback
      onOptionSelect(option); // Poi attiva la logica del genitore per passare all'enigma successivo
    }, MULTIPLE_CHOICE_FEEDBACK_DURATION_MS);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(option)}
          className={`
            bg-gray-700 p-6 rounded-md shadow-lg text-white font-bold text-center
            flex items-center justify-center cursor-pointer
            transition-all duration-300 ease-in-out transform hover:scale-105
            border-2 border-gray-600 // Bordo di default più spesso
            ${selectedOptionState === option ? `border-4 ${feedbackBorderClass}` : ''} // Bordo più spesso e colorato per l'opzione selezionata
            ${selectedOptionState !== null && selectedOptionState !== option ? 'opacity-50 pointer-events-none' : ''} // Opacizza le altre opzioni
          `}
          style={{ minHeight: '100px' }} // Assicura un'altezza consistente per le opzioni
          disabled={selectedOptionState !== null} // Disabilita i pulsanti una volta selezionata un'opzione
        >
          <span className="text-lg">{option}</span>
        </button>
      ))}
    </div>
  );
}

export default MultipleChoiceOptions;
