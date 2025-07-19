"use client"

import React from 'react';

const PokemonCard = ({ pokemon, onAdd, onRemove, isInTeam }) => {

  return (
    <div style={{width:"230px"}} className="p-4 flex flex-col justify-center items-center border rounded-md shadow bg-white">
      <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32 flex justify-center items-center" />
      <h2 className="text-3xl font-bold capitalize mt-3">{pokemon.name}</h2>
      <div>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type} className="capitalize">{type}</li>
          ))}
        </ul>
      </div>

      <div className="mt-2 flex justify-center items-center">
        {onAdd && !isInTeam && (
          <button
            onClick={() => onAdd(pokemon)}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded hover:bg-green-600 "
          >
            Add to Team
          </button>
        )}
        {onRemove && (
          <button
            onClick={() => onRemove(pokemon.name)}
            className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};




export default PokemonCard;
