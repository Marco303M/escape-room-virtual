import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// src/App.js
import React, { useState, useEffect, useRef } from 'react';
import { enigmas, rooms } from './components/EnigmaData';
import TimerDisplay from './components/TimerDisplay';
import ClueDisplay from './components/ClueDisplay';
import HintSection from './components/HintSection';
import SolutionInput from './components/SolutionInput';
import MultipleChoiceOptions from './components/MultipleChoiceOptions'; // Importa il nuovo componente
import MapModal from './components/MapModal';

function App() {
  const [currentEnigmaIndex, setCurrentEnigmaIndex] = useState(0);
  const [solutionInput, setSolutionInput] = useState('');
  const [message, setMessage] = useState('');
  const [totalTime, setTotalTime] = useState(0); // Tempo totale in secondi
  const [penaltyTime, setPenaltyTime] = useState(0); // Penalità accumulate in secondi
  const [showPenaltyMessage, setShowPenaltyMessage] = useState(false);
  const [revealedHintsCount, setRevealedHintsCount] = useState(0); // Numero di suggerimenti rivelati per l'enigma corrente
  const [showMapModal, setShowMapModal] = useState(false); // Stato per la visibilità della mappa
  const timerRef = useRef(null); // Riferimento per il timer setInterval

  // Effetto per avviare e gestire il timer
  useEffect(() => {
    // Avvia il timer solo se non siamo all'ultimo enigma
    if (currentEnigmaIndex < enigmas.length - 1) {
      timerRef.current = setInterval(() => {
        setTotalTime((prevTime) => prevTime + 1);
      }, 1000); // Aggiorna ogni secondo
    } else {
      // Se siamo all'ultimo enigma, ferma il timer
      clearInterval(timerRef.current);
    }

    // Reset dei suggerimenti quando si passa a un nuovo enigma
    setRevealedHintsCount(0);

    // Cleanup function: ferma il timer quando il componente si smonta o l'indice cambia
    return () => clearInterval(timerRef.current);
  }, [currentEnigmaIndex, enigmas.length]);

  // Formatta il tempo in HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    setSolutionInput(e.target.value);
  };

  // Funzione handleSubmit modificata per accettare un parametro di risposta opzionale
  const handleSubmit = (e, submittedAnswer = null) => {
    if (e) e.preventDefault(); // Previene il comportamento di default del form solo se è un evento di form

    const currentEnigma = enigmas[currentEnigmaIndex];
    const answerToCheck = submittedAnswer !== null ? submittedAnswer : solutionInput;

    if (answerToCheck.toLowerCase().trim() === currentEnigma.correctAnswer.toLowerCase().trim()) {
      // Soluzione corretta
      setMessage('Corretto! Ottimo lavoro!');
      setSolutionInput(''); // Resetta l'input
      setShowPenaltyMessage(false); // Nasconde il messaggio di penalità se era visibile

      // Passa all'enigma successivo
      if (currentEnigmaIndex < enigmas.length - 1) {
        setCurrentEnigmaIndex(currentEnigmaIndex + 1);
      } else {
        // Fine del gioco
        setMessage(`Congratulazioni! Hai risolto tutti gli enigmi in ${formatTime(totalTime + penaltyTime)}.`);
        clearInterval(timerRef.current); // Ferma il timer finale
      }
    } else {
      // Soluzione errata
      setMessage('Sbagliato! Penalità di 5 minuti.');
      setPenaltyTime((prevPenalty) => prevPenalty + 300); // Aggiunge 300 secondi (5 minuti)
      setShowPenaltyMessage(true); // Mostra il messaggio di penalità
      setSolutionInput(''); // Resetta l'input
      // Avvisa l'utente della penalità e poi passa comunque all'indizio successivo dopo un breve ritardo
      setTimeout(() => {
        if (currentEnigmaIndex < enigmas.length - 1) {
          setCurrentEnigmaIndex(currentEnigmaIndex + 1);
        } else {
          // Se l'ultimo enigma è stato sbagliato, mostra il messaggio finale
          setMessage(`Hai risolto tutti gli enigmi (con errori) in ${formatTime(totalTime + penaltyTime)}.`);
          clearInterval(timerRef.current);
        }
        setMessage(''); // Pulisce il messaggio dopo il passaggio all'enigma successivo
      }, 2000); // Mostra il messaggio di errore per 2 secondi
    }
  };

  const handleRequestHint = () => {
    const currentEnigma = enigmas[currentEnigmaIndex];
    if (revealedHintsCount < currentEnigma.hints.length) {
      setRevealedHintsCount(prevCount => prevCount + 1);
      setPenaltyTime(prevPenalty => prevPenalty + 120); // Aggiunge 120 secondi (2 minuti)
      setMessage('Suggerimento richiesto! Penalità di 2 minuti.');
      setTimeout(() => setMessage(''), 2000); // Pulisce il messaggio dopo 2 secondi
    }
  };

  const currentEnigma = enigmas[currentEnigmaIndex];

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 font-sans">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Escape Room Digitale</h1>

        {/* Pulsante Visualizza Mappa */}
        <button
          onClick={() => setShowMapModal(true)}
          className="mb-6 bg-purple-600 hover:bg-purple-700 text-black font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg w-full"
        >
          Visualizza Mappa
        </button>

        {/* Visualizzazione del tempo */}
        <TimerDisplay
          totalTime={totalTime}
          penaltyTime={penaltyTime}
          showPenaltyMessage={showPenaltyMessage}
          formatTime={formatTime}
        />

        {/* Indizio corrente */}
        <ClueDisplay
          enigma={currentEnigma}
          currentEnigmaIndex={currentEnigmaIndex}
        />

        {/* Suggerimenti */}
        <HintSection
          hints={currentEnigma.hints}
          revealedHintsCount={revealedHintsCount}
          allHintsRevealed={revealedHintsCount >= currentEnigma.hints.length}
          handleRequestHint={handleRequestHint}
        />

        {/* Input o Scelta Multipla (solo se non è l'ultimo enigma) */}
        {currentEnigma.id !== enigmas[enigmas.length - 1].id ? (
          currentEnigma.type === 'text_input' ? (
            <SolutionInput
              solutionInput={solutionInput}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <MultipleChoiceOptions
              options={currentEnigma.options}
              onOptionSelect={(selectedOption) => handleSubmit(null, selectedOption)} // Passa null per l'evento, e l'opzione selezionata
            />
          )
        ) : (
          <div className="text-center text-2xl font-bold text-green-400 mt-8">
            Gioco Completato!
            <p className="text-xl text-gray-300 mt-2">Tempo finale (incluse penalità): {formatTime(totalTime + penaltyTime)}</p>
          </div>
        )}

        {/* Messaggi di feedback */}
        {message && (
          <div className={`mt-6 p-4 rounded-md text-center font-semibold ${
            message.includes('Corretto') ? 'bg-green-600 text-white' :
            message.includes('Sbagliato') || message.includes('Suggerimento') ? 'bg-red-600 text-white' :
            'bg-gray-600 text-white'
          }`}>
            {message}
          </div>
        )}

        {/* Modale della Mappa */}
        <MapModal
          show={showMapModal}
          onClose={() => setShowMapModal(false)}
          currentRoomId={currentEnigma.room}
        />
      </div>
    </div>
  );
}

export default App;
