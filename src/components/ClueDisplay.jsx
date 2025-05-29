// src/components/ClueDisplay.jsx
import React from 'react';

// Funzione per determinare il colore del testo in base al colore di sfondo
const getTextColorClass = (backgroundColorClass) => {
  // Esempio: se il colore di sfondo è "bianco" (o un colore molto chiaro), usa testo nero
  // Puoi espandere questa logica per altri colori chiari (es. bg-yellow-100, bg-sky-200)
  if (backgroundColorClass.includes('bg-white') || backgroundColorClass.includes('bg-yellow-200') || backgroundColorClass.includes('bg-blue-100')) {
    return 'text-gray-900'; // Testo nero
  }
  return 'text-gray-200'; // Testo bianco/grigio chiaro di default
};

function ClueDisplay({ enigma, currentEnigmaIndex }) {
  // Applica il colore della stanza come classe di sfondo
  const clueBackgroundColorClass = enigma.roomColor || 'bg-gray-700'; // Fallback se non c'è colore
  const clueTextColorClass = getTextColorClass(clueBackgroundColorClass);

  // Costruisci il percorso dell'immagine
  const imageUrl = enigma.image ? `public/images/${enigma.image}` : null;

  return (
    <div className={`${clueBackgroundColorClass} p-5 rounded-md mb-6 border border-gray-600 shadow-md`}>
      <h2 className="text-xl font-semibold mb-3 text-blue-300">Indizio Enigma {currentEnigmaIndex + 1}:</h2>
      <p className={`text-lg leading-relaxed ${clueTextColorClass}`}>{enigma.text}</p> {/* Ora visualizza solo il testo */}

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
