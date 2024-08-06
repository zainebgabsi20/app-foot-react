import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './MatchDetailCard.css';
import { fetchMatchData } from '../../Services/matchService';

const MatchDetailCard = ({ match, onTeamClick }) => {
  const location = useLocation();
  const timeZone = location.state?.timeZone || 'UTC'; // Default to UTC if not provided
  const { t, i18n } = useTranslation(); // Initialize translation hook
  const [matchStatus, setMatchStatus] = useState('loading');

  useEffect(() => {
    if (!match) return; // Exit early if no match is provided

    const fetchStatus = async () => {
      try {
        const matchData = await fetchMatchData(match.id);
        const languageKey = i18n.language;
        const statusName = matchData.status_name[languageKey] || matchData.status_name.en;
        const statusKey = statusName.toLowerCase().replace(/\s+/g, '');
        console.log('Status name:', statusName); // Debugging log for status name
        console.log('Formatted status key:', statusKey); // Debugging log for formatted status key
        setMatchStatus(statusKey);
      } catch (error) {
        console.error('Error fetching match status:', error);
        setMatchStatus('loading');
      }
    };

    fetchStatus();
  }, [match, i18n.language]);

  if (!match) return null;

  const homeTeam = match.teams.home;
  const awayTeam = match.teams.away;

  const formatDate = (datetime) => {
    const date = new Date(datetime);
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
    return formattedDate;
  };

  const getScore = (match) => {
    if (match.scores.et_score) {
      const [homeScore, awayScore] = match.scores.et_score.split('-').map(Number);
      return { homeScore, awayScore };
    } else if (match.scores.ft_score) {
      const [homeScore, awayScore] = match.scores.ft_score.split('-').map(Number);
      return { homeScore, awayScore };
    } else {
      return { homeScore: null, awayScore: null };
    }
  };

  console.log('Match status key for translation******************:', matchStatus);

  const { homeScore, awayScore } = getScore(match);
  const date = formatDate(match.time.datetime);
  const status = t(`status.${matchStatus}`); // Translate status using i18n

  return (
    <div className="match-detail-card">
      <div className="teams">
        <div className="team-card" onClick={() => onTeamClick(homeTeam.id)}>
          <img 
            src={homeTeam?.img || 'default_home_logo.png'} 
            alt={`${homeTeam?.name || t('match.home')} Logo`} 
            className="team-logo-card" 
          />
          <p className="team-name-card">{homeTeam?.name || t('match.home')}</p>
        </div>
        <div className="score">
          <span className='score-card'>
            {homeScore !== null && awayScore !== null ? `${homeScore}-${awayScore}` : 'N/A'}
          </span>
          <p className='date'>{date}</p>
        </div>
        <div className="team-card" onClick={() => onTeamClick(awayTeam.id)}>
          <img 
            src={awayTeam?.img || 'default_away_logo.png'} 
            alt={`${awayTeam?.name || t('match.away')} Logo`} 
            className="team-logo-card" 
          />
          <p className="team-name-card">{awayTeam?.name || t('match.away')}</p>
        </div>
      </div>
      <div className="match-info-detailscard">
        <p>{date} / {status}</p>
      </div>
    </div>
  );
};

export default MatchDetailCard;
