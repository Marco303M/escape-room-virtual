// src/components/MapModal.js
import React from 'react';
import { rooms } from './EnigmaData'; // Importa le stanze definite

function MapModal({ show, onClose, currentRoomId }) {
  if (!show) {
    return null;
  }

  // Trova la stanza corrente per evidenziarla
  const currentRoom = rooms.find(room => room.id === currentRoomId);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-lg relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-6">Mappa dell'Area di Gioco</h2>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className={`p-4 rounded-md text-center text-white font-semibold flex flex-col items-center justify-center h-24 transition-all duration-300 ease-in-out
                ${room.color}
                ${currentRoomId === room.id ? 'border-4 border-yellow-300 scale-105 shadow-lg' : 'border border-gray-600'}`}
            >
              <span className="text-lg">{room.name}</span>
              {currentRoomId === room.id && (
                <span className="text-sm text-yellow-200 mt-1">(Stanza Attuale)</span>
              )}
            </div>
          ))}
        </div>

        {currentRoom && (
          <p className="text-center text-lg text-gray-300">
            Ti trovi attualmente nella: <span className="font-bold text-blue-300">{currentRoom.name}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default MapModal;
