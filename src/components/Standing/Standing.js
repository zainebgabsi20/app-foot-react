import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Standing.css';
import { fetchLeagueDetails, fetchStandingsData } from '../../Services/teamService';
import Loader from '../Loader/Loader';
import NoData from '../NoData/NoData';
import AllTab from './AllTab';
import HomeTab from './HomeTab';
import AwayTab from './AwayTab';
import StandingsTable from '../TeamDetails/StandingsTable';
import { useTranslation } from 'react-i18next'; // Import useTranslation

const Standing = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const [leagueDetails, setLeagueDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('All');
  const [seasonId, setSeasonId] = useState(null);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLeagueDetails = async () => {
      try {
        const data = await fetchLeagueDetails(leagueId);
        console.log('Fetched league details:', data);
        setLeagueDetails(data);

        let currentSeasonId = data.current_season_id;
        console.log('Determined seasonId:', currentSeasonId);
        setSeasonId(currentSeasonId);

        if (currentSeasonId) {
          const standingsData = await fetchStandingsData(currentSeasonId);
          console.log('Fetched standings data:', standingsData);
          setStandings(standingsData.standings || []);
        }
      } catch (error) {
        console.error('Error fetching league details:', error);
        setError(t('common.loading_error')); // Use translation for error message
      } finally {
        setLoading(false);
      }
    };

    getLeagueDetails();
  }, [leagueId, t]); // Add `t` to dependency array

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (loading) {
    return <Loader loading={loading} />;
  }

  const renderTabContent = () => {
    if (standings.length === 0) {
      return <NoData message={t('common.no_standings')} />; // Use translation for no data message
    }

    switch (activeTab) {
      case 'All':
        return <StandingsTable standings={standings} />;
      case 'Home':
        return <HomeTab standings={standings} />;
      case 'Away':
        return <AwayTab standings={standings} />;
      case 'Form':
        return <div>{t('common.form_tab')}</div>; // Translate Form tab content
      case 'Player stats':
        return <div>{t('common.player_stats_tab')}</div>; // Translate Player stats tab content
      default:
        return null;
    }
  };

  return (
    <div className="team-container">
      <div className="team-details-header">
        <button className="custom-arrow-button" onClick={handleBack}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 16.58L10.83 12 15.41 7.41 14 6l-6 6 6 6z" />
          </svg>
        </button>
        <h2 className="team-details-title">{t('common.standing')}</h2> {/* Translate "Standings" */}
      </div>
      <div className="league-info-standing">
        <h4>{leagueDetails ? leagueDetails.name : t('common.loading')}</h4>
      </div>
      <div className="tabs-league">
        <div className="tabs-container-draw">
          <button className={`tab-button-draw ${activeTab === 'All' ? 'active' : ''}`} onClick={() => handleTabClick('All')}>{t('common.all')}</button> {/* Translate "All" */}
          <button className={`tab-button-draw ${activeTab === 'Home' ? 'active' : ''}`} onClick={() => handleTabClick('Home')}>{t('match.home')}</button> {/* Translate "Home" */}
          <button className={`tab-button-draw ${activeTab === 'Away' ? 'active' : ''}`} onClick={() => handleTabClick('Away')}>{t('match.away')}</button> {/* Translate "Away" */}
        </div>
        <div className="tab-content-draw">
          {loading ? <Loader loading={loading} /> : renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Standing;
