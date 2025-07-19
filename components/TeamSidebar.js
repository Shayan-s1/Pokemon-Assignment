import React from 'react';
import PokemonCard from './PokemonCard';
import TeamStats from './TeamStats';

const TeamSidebar = ({ team, removeFromTeam }) => {
  return (
    <div className="p-4 w-full md:w-1/2 bg-gray-300 border-l">
      <h2 className="text-2xl font-bold mb-4">Your Team ({team.length}/6)</h2>
      {team.length === 0 ? (
        <p>No Pokémon in your team yet.</p>
      ) : (
        <>
        <TeamStats team={team} />
        <div className="flex flex-wrap gap-4">           
          {team.map((p) => (
            <PokemonCard key={p.name} pokemon={p} onRemove={removeFromTeam} />
          ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TeamSidebar;
