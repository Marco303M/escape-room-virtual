// src/components/MultipleChoiceOptions.jsx
import React, { useState } from 'react';
import { MULTIPLE_CHOICE_FEEDBACK_DURATION_MS } from '../utils/constants'; // Import constants

function MultipleChoiceOptions({ options, correctAnswer, onOptionSelect, isDisabled }) {
  const [selectedOptionState, setSelectedOptionState] = useState(null);
  const [feedbackBorderClass, setFeedbackBorderClass] = useState(''); // Stato per la classe del bordo

  const handleOptionClick = (option) => {
    // Se un'opzione è già stata selezionata o se il componente è disabilitato, non fare nulla
    if (selectedOptionState !== null || isDisabled) return;

    setSelectedOptionState(option); // Imposta l'opzione selezionata localmente
    const isCorrect = option.toLowerCase() === correctAnswer.toLowerCase();

    // Determina la classe del bordo di feedback
    const borderClass = isCorrect ? 'border-green-500' : 'border-red-500';
    setFeedbackBorderClass(borderClass);

    // Fornisci feedback visivo per una breve durata
    setTimeout(() => {
      setFeedbackBorderClass(''); // Rimuovi il bordo di feedback
      onOptionSelect(option); // Poi attiva la logica del genitore per passare all'enigma successivo
      setSelectedOptionState(null); // Resetta lo stato locale dopo la transizione
    }, MULTIPLE_CHOICE_FEEDBACK_DURATION_MS);
  };

  // Determina le classi grid in base al numero di opzioni
  let gridClasses = '';
  if (options.length === 1) {
    gridClasses = 'grid-cols-1';
  } else if (options.length === 2) {
    gridClasses = 'grid-cols-1 md:grid-cols-2';
  } else if (options.length === 3) {
    gridClasses = 'grid-cols-1 md:grid-cols-3';
  } else {
    // Per 4 o più opzioni, usa un layout più flessibile
    gridClasses = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  }

  return (
    <div className={`grid ${gridClasses} gap-4 mb-6`}>
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
          disabled={isDisabled || selectedOptionState !== null} // Disabilita se il padre lo richiede o se un'opzione è già stata selezionata localmente
        >
          <span className="text-lg">{option}</span>
        </button>
      ))}
    </div>
  );
}

export default MultipleChoiceOptions;
