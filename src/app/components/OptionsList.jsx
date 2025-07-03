import React from 'react';
export default function OptionsList({ options, onOptionClick }) {
  return (
    <div className="p-4 flex flex-col space-y-2">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onOptionClick(option)}
          className="w-full text-left px-2 py-2 bg-blue-500 text-white hover:bg-blue-600"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
