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
    type: 'text_input', // Tipo di domanda: input testuale
    clue: `Benvenuti nella vostra avventura! L'indizio iniziale è: 'Il numero di lettere nel nome del nostro pianeta.'<br/><img src="https://placehold.co/150x100/000/FFF?text=Pianeta" alt="Immagine Pianeta" class="mt-2 rounded-md"/>`,
    correctAnswer: "6", // Terra
    hints: ["Pensa al sistema solare.", "Qual è il pianeta su cui viviamo?", "Il nome è corto."],
  },
  {
    id: 1,
    type: 'multiple_choice', // Tipo di domanda: scelta multipla
    clue: `Ottimo! Ora, il prossimo indizio: 'Qual è il colore del cielo in una giornata serena?' Scegli la risposta corretta tra le opzioni.`,
    correctAnswer: "blu",
    options: ["rosso", "blu", "verde"], // Opzioni per la scelta multipla
    hints: ["Guarda in alto durante il giorno.", "Non è verde, né rosso.", "È un colore primario."],
  },
  {
    id: 2,
    type: 'text_input', // Tipo di domanda: input testuale
    clue: `Quasi! Per l'ultimo enigma: 'Il risultato di 7 moltiplicato per 8.'<br/><img src="https://placehold.co/180x80/000/FFF?text=7x8=?" alt="Immagine Operazione" class="mt-2 rounded-md"/>`,
    correctAnswer: "56",
    hints: ["È una moltiplicazione.", "Pensa alla tavola pitagorica.", "Il numero è tra 50 e 60."],
  },
];

// Assegna le stanze agli enigmi base
export const enigmasWithRooms = assignRoomsToEnigmas(baseEnigmas, rooms);

// Aggiungi l'enigma finale (senza stanza associata)
export const finalEnigma = {
  id: enigmasWithRooms.length,
  type: 'text_input', // Anche l'enigma finale ha un tipo
  clue: "Congratulazioni! Hai risolto tutti gli enigmi. Il tuo tempo finale è:",
  correctAnswer: "END", // Soluzione fittizia per indicare la fine
  hints: [], // Nessun suggerimento per l'enigma finale
  room: null, // Nessuna stanza per l'enigma finale
  roomColor: 'bg-gray-700', // Colore di default per l'enigma finale
};

export const enigmas = [...enigmasWithRooms, finalEnigma];
