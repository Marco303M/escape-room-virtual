// src/components/ClueDisplay.js
import React from 'react';

function ClueDisplay({ enigma, currentEnigmaIndex }) {
  // Applica il colore della stanza come classe di sfondo
  const clueBackgroundColorClass = enigma.roomColor || 'bg-gray-700'; // Fallback se non c'è colore

  return (
    <div className={`${clueBackgroundColorClass} p-5 rounded-md mb-6 border border-gray-600 shadow-md`}>
      <h2 className="text-xl font-semibold mb-3 text-blue-300">Indizio Enigma {currentEnigmaIndex + 1}:</h2>
      {/* Renderizza l'HTML dell'indizio */}
      <p className="text-lg text-gray-200 leading-relaxed" dangerouslySetInnerHTML={{ __html: enigma.clue }}></p>
    </div>
  );
}

export default ClueDisplay;
