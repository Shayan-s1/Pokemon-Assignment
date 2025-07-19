import React from 'react';

const TeamStats = ({ team }) => {
  const allTypes = team.flatMap((p) => p.types);
  const uniqueTypes = [...new Set(allTypes)];

  const avgBaseExp =
    team.length > 0
      ? (team.reduce((sum, p) => sum + p.base_experience, 0) / team.length).toFixed(2)
      : 0;

  return (
    <div style={{margin:"20px 0"}} className="p-4 bg-white border rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">Team Overview</h3>
      <p><strong>Total Unique Types:</strong> {uniqueTypes.length}</p>
      <p><strong>Types Covered:</strong> {uniqueTypes.join(', ') || 'None'}</p>
      <p><strong>Average Base Experience:</strong> {avgBaseExp}</p>
    </div>
  );
};

export default TeamStats;
