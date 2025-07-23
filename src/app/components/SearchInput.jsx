// components/SearchInput.jsx
import React from 'react';


export default function SearchInput({ userInput, setUserInput, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-200 bg-white">
      <div className="flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Rechercher un produit..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 text-black"
          aria-label="Champ de recherche de produit"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          aria-label="Lancer la recherche"
          title="Rechercher"
        >
          Envoyer

        </button>
      </div>
    </form>
  );
}
