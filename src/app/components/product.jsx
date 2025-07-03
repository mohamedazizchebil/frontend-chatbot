import React from 'react';

export default function Product({ content }) {
  return (
    <div className="flex items-center space-x-4 p-3 rounded-lg bg-white shadow-md border border-gray-200">
      <img
        src={content.image || 'https://via.placeholder.com/100'}
        alt={content.nom || 'Produit'}
        className="w-16 h-16 object-cover rounded"
      />
      <div>
        <h3 className="text-base font-semibold text-gray-800">
          {content.nom || 'Nom indisponible'}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {content.description || 'Description indisponible'}
        </p>
        {content.lien && (
          <a
            href={content.lien}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline text-sm"
          >
            Voir le produit
          </a>
        )}
      </div>
    </div>
  );
}
