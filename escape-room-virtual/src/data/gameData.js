// src/data/gameData.js

// Questo file contiene la definizione delle stanze e degli enigmi del gioco.
// Può essere modificato facilmente per aggiungere, rimuovere o aggiornare dati.

// Definizione delle stanze disponibili
export const rooms = [
  { id: 'room1', name: 'Sala del Drago', color: 'bg-red-700' },
  { id: 'room2', name: 'Stanza delle Rune', color: 'bg-green-700' },
  { id: 'room3', name: 'Cripta Antica', color: 'bg-blue-700' },
  // Aggiungi altre stanze qui se necessario
];

// Definizione degli enigmi del gioco
export const baseEnigmas = [
  {
    id: 0,
    type: 'text_input', // 'text_input' per risposta da digitare, 'multiple_choice' per scelta tra opzioni
    text: `Benvenuti nella vostra avventura! L'indizio iniziale è: 'Il numero di lettere nel nome del nostro pianeta.'`,
    image: 'pianeta.png', // Nome del file immagine (deve essere in public/images/)
    correctAnswer: "6",
    hints: ["Pensa al sistema solare.", "Qual è il pianeta su cui viviamo?", "Il nome è corto."],
    fixedRoom: 'room1', // ID della stanza fissa (opzionale). Se USE_FIXED_ROOMS è true, userà questa.
  },
  {
    id: 1,
    type: 'multiple_choice',
    text: `Ottimo! Ora, il prossimo indizio: 'Qual è il colore del cielo in una giornata serena?' Scegli la risposta corretta tra le opzioni.`,
    image: 'cielo.jpg',
    correctAnswer: "blu",
    options: ["rosso", "blu", "verde", "giallo"], // Esempio con più di 3 opzioni
    hints: ["Guarda in alto durante il giorno.", "Non è verde, né rosso.", "È un colore primario."],
    fixedRoom: null, // Nessuna stanza fissa, verrà assegnata casualmente se USE_FIXED_ROOMS è false
  },
  {
    id: 2,
    type: 'text_input',
    text: `Quasi! Per l'ultimo enigma: 'Il risultato di 7 moltiplicato per 8.'`,
    image: 'operazione.png',
    correctAnswer: "56",
    hints: ["È una moltiplicazione.", "Pensa alla tavola pitagorica.", "Il numero è tra 50 e 60."],
    fixedRoom: 'room3',
  },
  // Aggiungi altri enigmi qui seguendo lo stesso formato
  // Esempio di un altro enigma a scelta multipla:
  // {
  //   id: 3,
  //   type: 'multiple_choice',
  //   text: `Qual è la capitale dell'Italia?`,
  //   image: 'italia.png',
  //   correctAnswer: 'Roma',
  //   options: ['Milano', 'Firenze', 'Roma'],
  //   hints: ['È una città con un Colosseo.', 'Si trova nel Lazio.'],
  //   fixedRoom: 'room2',
  // },
];

// Per le domande a scelta multipla (type: 'multiple_choice'):
// Non c'è un vincolo tecnico sul numero massimo di opzioni (buste),
// ma per una buona user experience e leggibilità su schermi di diverse dimensioni,
// si consiglia di mantenere il numero di opzioni tra 3 e 5.
// Un numero eccessivo di opzioni potrebbe rendere la scelta confusa o difficile da visualizzare.
