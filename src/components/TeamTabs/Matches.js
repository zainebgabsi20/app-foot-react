import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Adjust if necessary
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import './Matches.css'; // Ensure you have a CSS file for styling

const Matches = () => {
  const { teamId } = useParams(); // Adjust if necessary
  const [matchesData, setMatchesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchesData = async () => {
      try {
        const response = await fetch(`https://api.superapp.mobizone.cloud/api/match/fixtures/${teamId}`);
        const data = await response.json();
        console.log('Fetched matches data:', data);

        if (data && typeof data === 'object') {
          setMatchesData(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching matches data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchesData();
  }, [teamId]);

  console.log('Rendered matchesData:', matchesData);

  if (loading) {
    return <Loader />;
  }

  const renderMatches = (matches, title) => (
    <div>
      <h4>{title}</h4>
      <div className='matches-table-container'>
        <table className="matches-table">
          <tbody>
            {matches.map(match => (
              <tr className='line' key={match.id}>
                <td className='table-date'>{new Date(match.time.datetime).toLocaleDateString()}</td>
                <td className="team-name1">
                  {match.teams.home.name}
                </td>
                <img className='h2h-img1' src={match.teams.home.img} alt={match.teams.home.name} />
                <td className="table-score">{match.scores.ft_score || 'vs'}</td>
                <img className='h2h-img1' src={match.teams.away.img} alt={match.teams.away.name} />
                <td className="team-name">
                  {match.teams.away.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const { last = [], next = [] } = matchesData;

  if (last.length === 0 && next.length === 0) {
    return <NoData />;
  }

  return (
    <div className="matches-container">
      {last.length > 0 && (
        <div className="matches-section">
          {renderMatches(last, 'Past Matches')}
        </div>
      )}
      {next.length > 0 && (
        <div className="matches-section">
          {renderMatches(next, 'Upcoming Matches')}
        </div>
      )}
    </div>
  );
};

export default Matches;
