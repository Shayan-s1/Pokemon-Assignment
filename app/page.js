"use client"

import { useState, useEffect } from 'react';
import PokemonCard from '@/components/PokemonCard';
import TeamSidebar from '../components/TeamSidebar';

export default function Home() {
  const [query, setQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [team, setTeam] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTeam = localStorage.getItem('pokemonTeam');
    if (savedTeam) {
      setTeam(JSON.parse(savedTeam));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('pokemonTeam', JSON.stringify(team));
  }, [team]);

  const fetchPokemon = async () => {
    setError('');
    setPokemon(null);
    if (!query) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;
      const res = await fetch(`${baseUrl}/pokemon/${query.toLowerCase()}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const data = await res.json();

      const pokemonData = {
        name: data.name,
        image: data.sprites.other.dream_world.front_default,
        types: data.types.map((t) => t.type.name),
        base_experience: data.base_experience,
      };

      setPokemon(pokemonData);
    } catch (err) {
      setError(err.message);
    }
  };

  const addToTeam = (poke) => {
    if (team.length >= 6) {
      alert('Team is full (max 6 Pokémon)');
      return;
    }
    if (team.find((p) => p.name === poke.name)) {
      alert(`${poke.name} is already in your team!`);
      return;
    }
    setTeam([...team, poke]);
  };

  const removeFromTeam = (name) => {
    setTeam(team.filter((p) => p.name !== name));
  };

  return (
    <div className="w-full flex flex-col md:flex-row min-h-screen bg-purple-100">
      <main className="flex-1 p-8">
        
        <h1 className='text-5xl text-center font-bold mb-8 mt-8'>Search & Create Pokemon Team</h1>
        <p className='text-xl text-center mb-8'>You can search Pokemon and create a team of maximum 6 pokemon.</p>
        <h2 className="text-3xl text-center font-bold mb-4">Pokémon Search</h2>

        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Enter Pokémon name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded mr-2 mb-2"
          />
          <button
            onClick={fetchPokemon}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className='flex justify-center items-center'>
        {pokemon && (
          <PokemonCard
          
            pokemon={pokemon}
            onAdd={addToTeam}
            isInTeam={team.some((p) => p.name === pokemon.name)}
          />
        )}
        </div>
      </main>

      <TeamSidebar team={team} removeFromTeam={removeFromTeam} />
    </div>
  );
}
