import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import { fetchLineup } from '../../Services/lineupService';
import './Lineup.css';
import './loading.css';

const Lineup = () => {
  const { matchId } = useParams();
  const [lineup, setLineup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLineupData = async () => {
      try {
        setLoading(true);
        const result = await fetchLineup(matchId);
        setLineup(result);
        console.log('Fetched lineup data:', result);
      } catch (error) {
        console.error('Error fetching lineup data:', error);
        setError(true);
        setLineup([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLineupData();
  }, [matchId]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error || !lineup || (Array.isArray(lineup) && lineup.length === 0)) {
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

  const homePlayers = lineup.home.squad;
  const awayPlayers = lineup.away.squad;

  return (
    <div className="lineup-container">
      <h3>Lineup</h3>
      <div className="lineup-grid">
        <div className="home-team">
          {homePlayers.map(renderPlayer)}
        </div>
        <div className="away-team">
          {awayPlayers.map(renderPlayer)}
        </div>
      </div>
    </div>
  );
};

export default Lineup;
