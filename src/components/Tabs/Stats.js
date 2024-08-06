import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader/Loader'; // Adjust the path as needed
import NoData from '../NoData/NoData'; // Adjust the path as needed
import { fetchMatchInformation } from '../../Services/apiService';
import './loading.css';
import './Stats.css';
import { useTranslation } from 'react-i18next'; // Import the translation hook

const Stats = () => {
  const { matchId } = useParams();
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { t } = useTranslation(); // Initialize the translation hook

  useEffect(() => {
    const fetchMatchInfoData = async () => {
      try {
        console.log('Fetching match information for match ID:', matchId);
        const result = await fetchMatchInformation(matchId);
        setMatchInfo(result);
        console.log('Fetched match information:', result);
      } catch (error) {
        console.error('Error fetching match information:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchInfoData();
  }, [matchId]);

  if (loading) {
    return <Loader loading={loading} />;
  }

  if (error || !matchInfo) {
    return <NoData />;
  }

  const stats = matchInfo.stats || [];
  console.log('Fetched stats data:', stats);

  const homeStats = stats[0] || {};
  const awayStats = stats[1] || {};
  console.log('Home Stats:', homeStats);
  console.log('Away Stats:', awayStats);

  const statsData = [
    { label: 'ball_possession', key: 'possessionpercent' },
    { label: 'shots_on', key: 'shots_on_target' },
    { label: 'shots_off', key: 'shots_off_target' },
    { label: 'blocked_shots', key: 'shots_blocked' },
    { label: 'crosses', key: 'crosses' },
    { label: 'corners', key: 'corners' },
    { label: 'offsides', key: 'offsides' },
    { label: 'action_areas', key: 'action_areas' },
    { label: 'attacks', key: 'attacks' },
    { label: 'ball_safe', key: 'ball_safe' },
    { label: 'crossing_accuracy', key: 'crossing_accuracy' },
    { label: 'dangerous_attacks', key: 'dangerous_attacks' },
    { label: 'fouls', key: 'fouls' },
    { label: 'free_kick', key: 'free_kick' },
    { label: 'goal_attempts', key: 'goal_attempts' },
    { label: 'goal_kick', key: 'goal_kick' },
    { label: 'goals', key: 'goals' },
    { label: 'injuries', key: 'injuries' },
    { label: 'key_passes', key: 'key_passes' },
    { label: 'passing_accuracy', key: 'passing_accuracy' },
    { label: 'penalties', key: 'penalties' },
    { label: 'possession_time', key: 'possessiontime' },
    { label: 'red_cards', key: 'redcards' },
    { label: 'shots_total', key: 'shots_total' },
    { label: 'substitutions', key: 'substitutions' },
    { label: 'throw_in', key: 'throw_in' },
    { label: 'xg', key: 'xg' },
    { label: 'yellow_cards', key: 'yellowcards' },
    { label: 'yellow_red_cards', key: 'yellowredcards' },
  ];

  console.log('Stats Data:', statsData);

  return (
    <div className="stats-container">
      <h3>{t('common.stats')}</h3>
      {statsData.map((stat, index) => {
        const homeValue = homeStats[stat.key] != null ? parseFloat(homeStats[stat.key]) : null;
        const awayValue = awayStats[stat.key] != null ? parseFloat(awayStats[stat.key]) : null;

        if (homeValue == null && awayValue == null) {
          return null; // Skip this stat item if both values are null or undefined
        }

        const isHomeHigher = homeValue > awayValue;
        const isEqual = homeValue === awayValue;
        const isAwayHigher = !isHomeHigher && !isEqual;

        // Log the name of the category and the comparison results
        console.log(`Category: ${stat.label}, Home: ${homeValue}, Away: ${awayValue}, isHomeHigher: ${isHomeHigher}, isEqual: ${isEqual}, isAwayHigher: ${isAwayHigher}`);

        return (
          <div key={index} className="stat-item">
            <div className="stat-label">{t(`stats.${stat.label}`)}</div>
            <div className="stat-bars">
              <div className="stat-home">
                <span
                  className="stat-value-circle"
                  style={{
                    borderColor: isHomeHigher || isEqual ? 'orange' : 'gray',
                    color: isHomeHigher || isEqual ? 'orange' : 'gray',
                  }}
                >
                  {homeValue !== null ? homeValue : '-'}
                </span>
                <div className="stat-bar-wrapper-orange">
                  {homeValue !== null && homeValue !== '-' && (
                    <div className="stat-bar-orange" style={{ width: `${homeValue}%`, backgroundColor: 'orange' }}></div>
                  )}
                </div>
              </div>
              <div className="stat-away">
                <div className="stat-bar-wrapper-red">
                  {awayValue !== null && awayValue !== '-' && (
                    <div className="stat-bar-red" style={{ width: `${awayValue}%`, backgroundColor: 'red' }}></div>
                  )}
                </div>
                <span
                  className="stat-value-circle"
                  style={{
                    borderColor: isAwayHigher || isEqual ? 'red' : 'gray',
                    color: isAwayHigher || isEqual ? 'red' : 'gray',
                  }}
                >
                  {awayValue !== null ? awayValue : '-'}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
