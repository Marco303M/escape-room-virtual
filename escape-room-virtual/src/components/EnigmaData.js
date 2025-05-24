// src/components/EnigmaData.js
import { USE_FIXED_ROOMS } from '../utils/constants'; // Importa la costante
import { baseEnigmas as rawBaseEnigmas, rooms } from '../data/gameData'; // Importa enigmi e stanze dal nuovo file

// Funzione per mescolare un array (algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Assegna le stanze agli enigmi
const assignRoomsToEnigmas = (enigmasToAssign, availableRooms, useFixed) => {
  const shuffledRooms = shuffleArray([...availableRooms]); // Copia e mescola le stanze per l'assegnazione casuale
  let roomIndexCounter = 0; // Contatore per l'assegnazione ciclica casuale

  return enigmasToAssign.map((enigma) => {
    let assignedRoom = null;
    let assignedRoomColor = null;

    if (useFixed && enigma.fixedRoom) {
      // Se USE_FIXED_ROOMS è true e l'enigma ha un fixedRoom, usa quello
      assignedRoom = enigma.fixedRoom;
      const roomInfo = availableRooms.find(r => r.id === assignedRoom);
      assignedRoomColor = roomInfo ? roomInfo.color : 'bg-gray-700'; // Fallback colore
    } else {
      // Altrimenti, assegna casualmente (o ciclicamente se le stanze sono poche)
      assignedRoom = shuffledRooms[roomIndexCounter % shuffledRooms.length].id;
      assignedRoomColor = shuffledRooms[roomIndexCounter % shuffledRooms.length].color;
      roomIndexCounter++; // Incrementa per il prossimo enigma casuale
    }

    return {
      ...enigma,
      room: assignedRoom,
      roomColor: assignedRoomColor,
    };
  });
};

// Assegna le stanze agli enigmi base in base alla costante USE_FIXED_ROOMS
export const enigmasWithRooms = assignRoomsToEnigmas(rawBaseEnigmas, rooms, USE_FIXED_ROOMS);

// Aggiungi l'enigma finale (senza stanza associata)
export const finalEnigma = {
  id: enigmasWithRooms.length,
  type: 'text_input',
  text: "Congratulazioni! Hai risolto tutti gli enigmi. Il tuo tempo finale è:",
  image: null,
  correctAnswer: "END",
  hints: [],
  room: null,
  roomColor: 'bg-gray-700',
};

export const enigmas = [...enigmasWithRooms, finalEnigma];

// Esporta anche le stanze per i componenti che ne hanno bisogno (es. MapModal)
export { rooms };
