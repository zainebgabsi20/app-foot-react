import React, { useEffect, useState } from 'react';
import StandingsTable from '../TeamDetails/StandingsTable';
import { fetchStandingsData } from '../../Services/teamService';

const AllTab = ({ seasonId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const getStandings = async () => {
      try {
        const data = await fetchStandingsData(seasonId);
        setStandings(data);
      } catch (error) {
        console.error('Error fetching standings:', error);
      }
    };

    getStandings();
  }, [seasonId]);

  return (
    <div>
      <StandingsTable standings={standings} />
    </div>
  );
};

export default AllTab;
