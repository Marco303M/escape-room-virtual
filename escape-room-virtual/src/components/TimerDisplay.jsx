// src/components/TimerDisplay.js
import React from 'react';

function TimerDisplay({ totalTime, penaltyTime, showPenaltyMessage, formatTime }) {
  return (
    <div className="text-center text-xl mb-6 p-3 bg-gray-700 rounded-md shadow-inner">
      Tempo Trascorso: <span className="font-mono text-yellow-300">{formatTime(totalTime)}</span>
      {penaltyTime > 0 && (
        <div className="text-red-400 text-lg mt-2">
          Penalità Totale: <span className="font-mono">{formatTime(penaltyTime)}</span>
        </div>
      )}
      {showPenaltyMessage && (
        <div className="text-red-500 font-semibold mt-2 animate-pulse">
          5 minuti di penalità aggiunti!
        </div>
      )}
    </div>
  );
}

export default TimerDisplay;
