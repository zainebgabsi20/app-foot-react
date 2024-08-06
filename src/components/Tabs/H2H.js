import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import { fetchH2H } from '../../Services/h2hService';
import './loading.css';
import './H2H.css';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const H2H = () => {
  const { matchId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useTranslation(); // Initialize the translation hook

  useEffect(() => {
    const fetchH2HData = async () => {
      try {
        setLoading(true);
        const result = await fetchH2H(matchId);
        setData(result);
        console.log('Fetched H2H data:', result);
      } catch (error) {
        console.error('Error fetching H2H data:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchH2HData();
  }, [matchId]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error || !data) {
    return <NoData />;
  }

  const renderMatches = (matches, title) => (
    <div>
      <h4>{title}</h4>
      <div className='h2h-table'>
        <table className="matches-table">
          <tbody>
            {matches.map(match => (
              <tr className='line' key={match.id}>
                <td className='table-date'>{new Date(match.startdate).toLocaleDateString()}</td>
                <td className="team-name1">
                  {match.teams.home.name}
                </td>
                <img className='h2h-img1' src={match.teams.home.img} alt={match.teams.home.name} />

                <td className="table-score">{match.ft_score}</td>

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

  const homeMatches = data.home.events.overall;
  const awayMatches = data.away.events.overall;

  return (
    <div>
      <h3>{t('common.h2h')}</h3> {/* Translate the H2H header */}
      {renderMatches(homeMatches, `${t('common.latest_matches')} ${data.home.name}`)}
      {renderMatches(awayMatches, `${t('common.latest_matches')} ${data.away.name}`)}
    </div>
  );
};

export default H2H;
