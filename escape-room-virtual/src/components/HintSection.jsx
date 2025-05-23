// src/components/HintSection.js
import React from 'react';

function HintSection({ hints, revealedHintsCount, allHintsRevealed, handleRequestHint }) {
  const hasHints = hints && hints.length > 0;

  if (!hasHints) {
    return null; // Non mostrare la sezione se non ci sono suggerimenti
  }

  return (
    <div className="bg-gray-700 p-5 rounded-md mb-6 border border-gray-600 shadow-md">
      <h3 className="text-xl font-semibold mb-3 text-blue-300">Suggerimenti:</h3>
      {hints.slice(0, revealedHintsCount).map((hint, index) => (
        <p key={index} className="text-md text-gray-300 mt-2 italic">
          - {hint}
        </p>
      ))}
      {!allHintsRevealed && (
        <button
          onClick={handleRequestHint}
          className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full"
        >
          Richiedi Suggerimento ({hints.length - revealedHintsCount} rimasti)
        </button>
      )}
      {allHintsRevealed && (
        <p className="text-md text-gray-400 mt-2 text-center">Nessun suggerimento disponibile.</p>
      )}
    </div>
  );
}

export default HintSection;
