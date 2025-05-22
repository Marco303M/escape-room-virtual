// src/components/SolutionInput.js
import React from 'react';

function SolutionInput({ solutionInput, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={solutionInput}
        onChange={handleInputChange}
        placeholder="Inserisci la tua soluzione qui..."
        className="p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
      >
        Verifica Soluzione
      </button>
    </form>
  );
}

export default SolutionInput;
