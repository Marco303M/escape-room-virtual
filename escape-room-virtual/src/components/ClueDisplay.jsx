// src/components/ClueDisplay.js
import React from 'react';

function ClueDisplay({ enigma, currentEnigmaIndex }) {
  // Applica il colore della stanza come classe di sfondo
  const clueBackgroundColorClass = enigma.roomColor || 'bg-gray-700'; // Fallback se non c'è colore

  // Costruisci il percorso dell'immagine
  // process.env.PUBLIC_URL è utile per gestire percorsi statici in React
  const imageUrl = enigma.image ? `${process.env.PUBLIC_URL}/images/${enigma.image}` : null;

  return (
    <div className={`${clueBackgroundColorClass} p-5 rounded-md mb-6 border border-gray-600 shadow-md`}>
      <h2 className="text-xl font-semibold mb-3 text-blue-300">Indizio Enigma {currentEnigmaIndex + 1}:</h2>
      <p className="text-lg text-gray-200 leading-relaxed">{enigma.text}</p> {/* Ora visualizza solo il testo */}

      {/* Visualizza l'immagine se il percorso è disponibile */}
      {imageUrl && (
        <div className="mt-4 flex justify-center">
          <img
            src={imageUrl}
            alt={`Immagine per l'enigma ${currentEnigmaIndex + 1}`}
            className="rounded-md max-w-full h-auto border border-gray-500"
            style={{ maxWidth: '300px' }} // Puoi regolare la dimensione massima
          />
        </div>
      )}
    </div>
  );
}

export default ClueDisplay;
