import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MatchDetailCard from '../MatchDetailCard/MatchDetailCard';
import { fetchMatchData } from '../../Services/matchService';
import './Match-details.css';
import Tabs from '../Tabs/Tabs';

const MatchDetails = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || new Date();
  const { t } = useTranslation(); // Initialize translation hook

  useEffect(() => {
    const getMatchData = async () => {
      try {
        const data = await fetchMatchData(matchId);
        setMatchData(data);
        console.log('Fetched match data:', data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    getMatchData();
  }, [matchId]);

  const handleBack = () => {
    navigate(-1, { state: { selectedDate } });
  };

  const handleTeamClick = (teamId) => {
    navigate(`/team/${teamId}`);
  };

  return (
    <div className="whole-container">
      <div className="match-details-header">
        <button className="custom-arrow-button" onClick={handleBack}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 16.58L10.83 12 15.41 7.41 14 6l-6 6 6 6z" />
          </svg>
        </button>
        <h2 className="match-details-title">{t('match_details.title')}</h2>
      </div>
      {matchData ? (
        <>
          <MatchDetailCard match={matchData} onTeamClick={handleTeamClick} />
          <Tabs />
        </>
      ) : (
        <p>{t('common.loading_match_details')}</p>
      )}
    </div>
  );
};

export default MatchDetails;
