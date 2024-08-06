import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import { fetchLineup } from '../../Services/lineupService';
import './Substitutes.css';
import './loading.css';

const Substitutes = () => {
  const { matchId } = useParams();
  const [substitutes, setSubstitutes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchLineup(matchId);
        setSubstitutes(result.benchs || []);
        console.log('Fetched substitutes data:', result.benchs);
      } catch (error) {
        console.error('Error fetching substitutes data:', error);
        setError(true);
        setSubstitutes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchId]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error || !substitutes || (Array.isArray(substitutes) && substitutes.length === 0)) {
    return <NoData />;
  }

  const formatName = (name) => {
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}. ${names.slice(1).join(' ')}`;
    }
    return name;
  };

  const renderPlayer = (player) => (
    <div className="player-card" key={player.player.id}>
      <span className="player-number">{player.number}</span>
      <span className="player-name">{formatName(player.player.name)}</span>
    </div>
  );

  const homeSubstitutes = substitutes[0]?.home || [];
  const awaySubstitutes = substitutes[0]?.away || [];

  return (
    <div className="substitutes-container">
      <h3>Substitutes</h3>
      <div className="substitutes-grid">
        <div className="home-team">
          {homeSubstitutes.map(renderPlayer)}
        </div>
        <div className="away-team">
          {awaySubstitutes.map(renderPlayer)}
        </div>
      </div>
    </div>
  );
};

export default Substitutes;
