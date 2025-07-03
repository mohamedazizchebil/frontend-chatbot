
import React from 'react';

export default function ChatInput({ userInput, setUserInput, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-t border-gray-200">
      <div className="flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Rechercher un produit..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
}
