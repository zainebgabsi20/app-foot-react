import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import First from './first';
import Second from './second';
import Third from './third';
import Fourth from './fourth';
import './Draw.css';

const Draw = () => {
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('1/8');
  const [seasonId, setSeasonId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLeagueDetails = async () => {
      try {
        const leagueDetails = await fetchLeagueDetails(leagueId);
        console.log('League Details:', leagueDetails);

        // Use current_season_id directly
        if (leagueDetails.current_season_id) {
          setSeasonId(leagueDetails.current_season_id);
          console.log('Current Season ID:', leagueDetails.current_season_id);
        } else {
          console.error('No current season ID found.');
        }
      } catch (error) {
        console.error('Error fetching league details:', error);
      } finally {
        setLoading(false);
      }
    };

    getLeagueDetails();
  }, [leagueId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="team-container">
      <div className="team-details-header">
        <button className="custom-arrow-button" onClick={handleBack}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 16.58L10.83 12 15.41 7.41 14 6l-6 6 6 6z" />
          </svg>
        </button>
        <h2 className="team-details-title">{t('draw.title')}</h2>
      </div>

      <div className="tabs-container-draw">
        <button
          className={`tab-button-draw ${activeTab === '1/8' ? 'active' : ''}`}
          onClick={() => handleTabClick('1/8')}
        >
          1/8
        </button>
        <button
          className={`tab-button-draw ${activeTab === 'QF' ? 'active' : ''}`}
          onClick={() => handleTabClick('QF')}
        >
          QF
        </button>
        <button
          className={`tab-button-draw ${activeTab === 'SF' ? 'active' : ''}`}
          onClick={() => handleTabClick('SF')}
        >
          SF
        </button>
        <button
          className={`tab-button-draw ${activeTab === 'F' ? 'active' : ''}`}
          onClick={() => handleTabClick('F')}
        >
          F
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : seasonId ? (
        <div className="tab-content-draw">
          {activeTab === '1/8' && <First seasonId={seasonId} />}
          {activeTab === 'QF' && <Second seasonId={seasonId} />}
          {activeTab === 'SF' && <Third seasonId={seasonId} />}
          {activeTab === 'F' && <Fourth seasonId={seasonId} />}
        </div>
      ) : (
        <div>No current season available.</div>
      )}
    </div>
  );
};

export default Draw;
export const fetchLeagueDetails = async (leagueId) => {
  try {
    const apiUrl = `https://api.superapp.mobizone.cloud/api/league/${leagueId}`;
    console.log('Fetching league data ************:', apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching league details:", error);
    throw error;
  }
};