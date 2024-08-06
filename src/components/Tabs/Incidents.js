import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData';
import { fetchMatchInformation } from '../../Services/apiService';
import './loading.css';
import './Incidents.css';

const Incidents = () => {
  const { matchId } = useParams();
  const { t } = useTranslation(); // Initialize translation hook
  const [matchInfo, setMatchInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  if (error || !matchInfo || !matchInfo.events || matchInfo.events.length === 0) {
    return <NoData />;
  }

  const events = matchInfo.events || [];
  console.log('Events:', events);
  const { ht_score, ft_score } = matchInfo.scores;

  const homeTeamId = matchInfo.teams.home.id;
  const awayTeamId = matchInfo.teams.away.id;

  console.log('Home Team ID:', homeTeamId);
  console.log('Away Team ID:', awayTeamId);

  events.forEach(event => {
    console.log(`Event minute: ${event.minute}, team_id: ${event.team_id}, type: ${event.type}, player_name: ${event.player_name}, info: ${event.info}`);
  });

  const renderEventIcon = (type) => {
    switch(type) {
      case 'goal':
        return <img src="/goal.png" alt={t('incidents.goal')} />;
      case 'corner':
        return <img src="/corner.png" alt={t('incidents.corner')} />;
      case 'shot_off_target':
        return <img src="/off-target.png" alt={t('incidents.shot_off_target')} />;
      case 'shot_on_target':
        return <img src="/target.png" alt={t('incidents.shot_on_target')} />;
      case 'yellowcard':
        return <img src="/yellow-card.png" alt={t('incidents.yellowcard')} />;
      case 'redcard':
        return <img src="/red-card.png" alt={t('incidents.redcard')} />;
      case 'substitution':
        return <img src="/switch.png" alt={t('incidents.substitution')} />;
      default:
        return '';
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (a.minute !== b.minute) {
      return a.minute - b.minute;
    }
    return (a.extra_minute || 0) - (b.extra_minute || 0);
  });

  console.log('Sorted Events:', sortedEvents);

  const renderEvents = (sortedEvents) => {
    return sortedEvents.map(event => {
      const isHomeTeam = event.team_id == homeTeamId; // Ensure type coercion for comparison
      return (
        <div key={`${event.minute}-${event.type}-${event.player_id}`} className={`incident-item ${isHomeTeam ? 'home-event' : 'away-event'}`}>
          {isHomeTeam ? (
            <>
              <span className="incident-minute">{`${event.minute}${event.extra_minute ? '+' + event.extra_minute : ''}' `}</span>
              <span className="incident-icon">{renderEventIcon(event.type)}</span>
              <span className="incident-text">
                {event.player_name}{event.related_player_name ? `/ ${event.related_player_name}` : ''}
                {event.info ? ` ( ${event.info})` : ''}
              </span>
            </>
          ) : (
            <>
              <span className="incident-text">
                {event.player_name}{event.related_player_name ? ` /${event.related_player_name}` : ''}
                {event.info ? ` ( ${event.info})` : ''}
              </span>
              <span className="incident-icon">{renderEventIcon(event.type)}</span>
              <span className="incident-minute">{`${event.minute}${event.extra_minute ? '+' + event.extra_minute : ''}'`}</span>
            </>
          )}
        </div>
      );
    });
  };

  const firstHalfEvents = sortedEvents.filter(event => event.minute <= 45);
  const secondHalfEvents = sortedEvents.filter(event => event.minute > 45);

  return (
    <div className="incidents-container">
      <h3>{t('common.incidents')}</h3>
      <div className="scoreboard">
        <div className="half">{t('common.first_half')}</div>
        <div className="event-score">{ht_score || '0-0'}</div>
      </div>
      <div className="incidents-list">
        {renderEvents(firstHalfEvents)}
      </div>
      <div className="scoreboard">
        <div className="half">{t('common.second_half')}</div>
        <div className="event-score">{ft_score || '0-0'}</div>
      </div>
      <div className="incidents-list">
        {renderEvents(secondHalfEvents)}
      </div>
    </div>
  );
};

export default Incidents;
