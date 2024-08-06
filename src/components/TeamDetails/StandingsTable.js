import React, { useEffect, useState } from 'react';
import { fetchTeamData } from '../../Services/teamService';
import './StandingsTable.css';

const StandingsTable = ({ standings }) => {
  const iconPath = '/team-icon.png';
  const [teamLogos, setTeamLogos] = useState({});

  useEffect(() => {
    const fetchLogos = async () => {
      const logos = {};
      for (const item of standings) {
        const group = Array.isArray(item) ? item : [item];
        for (const team of group) {
          if (!logos[team.team_id]) {
            try {
              const teamData = await fetchTeamData(team.team_id);
              logos[team.team_id] = teamData.img || 'default-logo-url.png';
              console.log(`Fetched logo for team ${team.team_id}:`, teamData.img); // Debugging line
            } catch (error) {
              console.error(`Error fetching data for team ${team.team_id}:`, error);
              logos[team.team_id] = 'default-logo-url.png';
            }
          }
        }
      }
      setTeamLogos(logos);
    };

    if (standings && Array.isArray(standings)) {
      fetchLogos();
    }
  }, [standings]);

  useEffect(() => {
    console.log('Team logos in StandingsTable:', teamLogos); // Log team logos
  }, [teamLogos]);

  return (
    <table className="standings-table2">
      <thead>
        <tr>
          <th><img src={iconPath} alt="Icon" className="icon2" /></th>
          <th>Team</th>
          <th>MP</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>GD</th>
          <th className="points-column2">PTS</th>
          <th>Gr</th>
        </tr>
      </thead>
      <tbody>
        {standings.flatMap((group, groupIndex) => {
          const teams = Array.isArray(group) ? group : [group];
          return teams.map((team, teamIndex) => {
            const teamLogo = teamLogos[team.team_id] || 'default-logo-url.png';
            const groupLetter = team.group_name ? team.group_name.slice(-1) : '';
            const overall = team.overall || {};

            return (
              <tr key={`team-${groupIndex}-${teamIndex}`}>
                <td>
                  <div className="position-circle2">{overall.position ?? '-'}</div>
                </td>
                <td>
                  <div className="team-logo-name-container">
                    <img src={teamLogo} alt={`${team.team_name} Logo`} className="team-logo5" />
                    <span>{team.team_name}</span>
                  </div>
                </td>
                <td>{overall.games_played ?? '-'}</td>
                <td>{overall.won ?? '-'}</td>
                <td>{overall.draw ?? '-'}</td>
                <td>{overall.lost ?? '-'}</td>
                <td>{overall.goals_diff ?? '-'}</td>
                <td className="points-column2">{overall.points ?? '-'}</td>
                <td>{groupLetter}</td>
              </tr>
            );
          });
        })}
      </tbody>
    </table>
  );
};

export default StandingsTable;
