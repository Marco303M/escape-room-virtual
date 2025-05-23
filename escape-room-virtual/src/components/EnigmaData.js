// src/components/EnigmaData.js

// Definizione delle stanze disponibili
export const rooms = [
  { id: 'room1', name: 'Sala del Drago', color: 'bg-red-700' },
  { id: 'room2', name: 'Stanza delle Rune', color: 'bg-green-700' },
  { id: 'room3', name: 'Cripta Antica', color: 'bg-blue-700' },
];

// Funzione per mescolare un array (algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Assegna casualmente le stanze agli enigmi
const assignRoomsToEnigmas = (enigmasToAssign, availableRooms) => {
  const shuffledRooms = shuffleArray([...availableRooms]); // Copia e mescola le stanze
  return enigmasToAssign.map((enigma, index) => {
    // Assegna una stanza in modo ciclico se ci sono più enigmi che stanze,
    // o semplicemente assegna una stanza unica se ci sono abbastanza stanze.
    const roomIndex = index % shuffledRooms.length;
    return {
      ...enigma,
      room: shuffledRooms[roomIndex].id,
      roomColor: shuffledRooms[roomIndex].color,
    };
  });
};

// Definizione degli enigmi (puoi aggiungere quanti enigmi vuoi)
const baseEnigmas = [
  {
    id: 0,
    type: 'text_input',
    text: `Benvenuti nella vostra avventura! L'indizio iniziale è: 'Il numero di lettere nel nome del nostro pianeta.'`, // Solo testo
    image: 'pianeta.png', // Solo nome del file immagine
    correctAnswer: "6", // Terra
    hints: ["Pensa al sistema solare.", "Qual è il pianeta su cui viviamo?", "Il nome è corto."],
  },
  {
    id: 1,
    type: 'multiple_choice',
    text: `Ottimo! Ora, il prossimo indizio: 'Qual è il colore del cielo in una giornata serena?' Scegli la risposta corretta tra le opzioni.`, // Solo testo
    image: 'cielo.jpg', // Solo nome del file immagine (es. una foto di cielo)
    correctAnswer: "blu",
    options: ["rosso", "blu", "verde"],
    hints: ["Guarda in alto durante il giorno.", "Non è verde, né rosso.", "È un colore primario."],
  },
  {
    id: 2,
    type: 'text_input',
    text: `Quasi! Per l'ultimo enigma: 'Il risultato di 7 moltiplicato per 8.'`, // Solo testo
    image: 'operazione.png', // Solo nome del file immagine
    correctAnswer: "56",
    hints: ["È una moltiplicazione.", "Pensa alla tavola pitagorica.", "Il numero è tra 50 e 60."],
  },
];

// Assegna le stanze agli enigmi base
export const enigmasWithRooms = assignRoomsToEnigmas(baseEnigmas, rooms);

// Aggiungi l'enigma finale (senza stanza associata)
export const finalEnigma = {
  id: enigmasWithRooms.length,
  type: 'text_input',
  text: "Congratulazioni! Hai risolto tutti gli enigmi. Il tuo tempo finale è:", // Solo testo
  image: null, // Nessuna immagine per l'enigma finale
  correctAnswer: "END",
  hints: [],
  room: null,
  roomColor: 'bg-gray-700',
};

export const enigmas = [...enigmasWithRooms, finalEnigma];
