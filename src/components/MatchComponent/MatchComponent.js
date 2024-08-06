import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchComponent.css';
import { fetchLeagueDetails } from '../../Services/teamService';
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

const MatchComponent = ({ matches, timeZone }) => {
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();
  const [leagueDetails, setLeagueDetails] = useState({});

  useEffect(() => {
    const fetchAndSetLeagueDetails = async () => {
      const leagueIds = [...new Set(matches.map(match => match.league.id))]; // Get unique league IDs
      const details = {};

      for (const leagueId of leagueIds) {
        try {
          const data = await fetchLeagueDetails(leagueId);
          console.log(`Fetched league details for leagueId ${leagueId}:`, data); // Log the fetched data for each league
          details[leagueId] = data;
        } catch (error) {
          console.error('Error fetching league details:', error);
        }
      }

      setLeagueDetails(details);
    };

    fetchAndSetLeagueDetails();
  }, [matches]);

  const formatTime = (datetime) => {
    const date = new Date(datetime);
    return new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone,
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const handleMatchClick = (matchId) => {
    navigate(`/match/${matchId}`, { state: { timeZone } });
  };

  const handleLeagueClick = (leagueId, isCup) => {
    const page = isCup ? 'draw' : 'standing';
    console.log("league id idn matchcompo!!!!!!!!!!!!!!!!!!",leagueId);
    navigate(`/${page}/${leagueId}`);
  };

  const getScore = (match) => {
    if (match.scores.et_score) {
      const [homeScore, awayScore] = match.scores.et_score.split('-').map(Number);
      return { homeScore, awayScore };
    } else if (match.scores.ft_score) {
      const [homeScore, awayScore] = match.scores.ft_score.split('-').map(Number);
      return { homeScore, awayScore };
    } else {
      return { homeScore: '-', awayScore: '-' };
    }
  };

  const matchesByLeague = matches.reduce((acc, match) => {
    const leagueName = match.league.name;
    if (!acc[leagueName]) {
      acc[leagueName] = [];
    }
    acc[leagueName].push(match);
    return acc;
  }, {});

  return (
    <div className="match-slider">
      {Object.keys(matchesByLeague).map((leagueName, leagueIndex) => {
        const league = matchesByLeague[leagueName][0].league;
        const isCup = leagueDetails[league.id]?.is_cup === "1";
        const label = isCup ? t('common.draw') : t('common.standing'); // Use translation for "Draw" and "Standing"

        console.log(`League ${leagueName}: isCup=${isCup}, label=${label}`); // Debugging line

        return (
          <div key={leagueIndex} className="league-section">
            <div className="league-header">
              <div className="league-name">
                {leagueName}
              </div>
              <div className="league-label" onClick={() => handleLeagueClick(league.id, isCup)}>
                {label}
              </div>
            </div>
            <div className="matches-container">
              {matchesByLeague[leagueName].map((match, index) => {
                const { homeScore, awayScore } = getScore(match);
                const isLive = match.status === '1';

                return (
                  <div className="slide" key={index} onClick={() => handleMatchClick(match.id)}>
                    <div className="card">
                      <div className="live-info-container">
                        <div className="live-container">
                          {isLive ? (
                            <div className="live-indicator">
                              <div className="live-text">{t('common.live')}</div> {/* Use translation for "Live" */}
                            </div>
                          ) : (
                            <div className="time-container">
                              <span className="time">{match.time && formatTime(match.time.datetime)}</span>
                            </div>
                          )}
                        </div>
                        <div className="info-container">
                          <div className="teams-container">
                            <div className="team2">
                              <img src={match.teams.home.img} alt={`${match.teams.home.name} Logo`} className="logo2" />
                              <span className="team-name2">{match.teams.home.name}</span>
                              <span className="team-score2">{homeScore}</span>
                            </div>
                            <div className="team2">
                              <img src={match.teams.away.img} alt={`${match.teams.away.name} Logo`} className="logo2" />
                              <span className="team-name2">{match.teams.away.name}</span>
                              <span className="team-score2">{awayScore}</span>
                            </div>
                          </div>
                        </div>
                        <div className="arrow-container">
                          <div className="arrow-right"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MatchComponent;
