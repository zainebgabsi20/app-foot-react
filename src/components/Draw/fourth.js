import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { fetchTeamData } from '../../Services/teamService'; // Ensure this service is correctly imported
import './final.css'; // Reuse the same styles if applicable
import NoData from '../NoData/NoData'; // Import the NoData component
import Loader from '../Loader/Loader'; // Import the Loader component

const Fourth = ({ seasonId }) => { // Accept seasonId as a prop
  const { t } = useTranslation(); // Initialize translation hook
  const [teamLogos, setTeamLogos] = useState({});
  const [drawData, setDrawData] = useState([]); // State for API data
  const [loading, setLoading] = useState(true); // State for loading

  // Construct the API endpoint using the provided seasonId
  const apiEndpoint = `https://api.superapp.mobizone.cloud/api/cup_draw/${seasonId}`;

  // Fetch data from the API
  useEffect(() => {
    const fetchDrawData = async () => {
      console.log(`Fetching draw data from API: ${apiEndpoint}`); // Log the API endpoint
      try {
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log('Fetched draw data:', data); // Debugging line
        setDrawData(data || []); // Assuming the API returns an array of matches or an empty array
      } catch (error) {
        console.error('Error fetching draw data:', error);
        setDrawData([]); // Set empty array on error
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    if (seasonId) { // Ensure seasonId is provided before fetching data
      fetchDrawData();
    }
  }, [apiEndpoint, seasonId]);

  // Fetch team logos
  useEffect(() => {
    const fetchLogos = async () => {
      const logos = {};
      const finalMatches = drawData.filter((match) => match.group_name === 'Final');

      for (const match of finalMatches) {
        const teamIds = [match.home_id, match.away_id];
        for (const teamId of teamIds) {
          logos[teamId] = '?'; // Replace logos with question mark
        }
      }
      setTeamLogos(logos);
    };

    if (drawData.length > 0) { // Ensure we only fetch logos when drawData is available
      fetchLogos();
    }
  }, [drawData]);

  const renderMatch = (match) => (
    <div className="matchup4" key={match.id}>
      <div className="container-first">
        <div className="match-details-first">
          <div className="team-first">
            <span className="team-name-first">
              <div className="team-logo-fourth">{teamLogos[match.home_id] || '?'}</div>
              {match.home_name}
            </span>
          </div>
          <div className="team-first">
            <span className="team-name-first">
              <div className="team-logo-fourth">{teamLogos[match.away_id] || '?'}</div>
              {match.away_name}
            </span>
          </div>
        </div>
        <div className="team-scores-container">
          <span className="team-score-first">{match.overall_result.home}</span>
          <span className="team-score-first">{match.overall_result.away}</span>
        </div>
      </div>
      <div className="arrow1"></div>
      <button className="h2h-button-first">H2H</button>
    </div>
  );

  const finalMatch = drawData.filter((match) => match.group_name === 'Final');

  return (
    <div className="final-container">
      {loading ? (
        <Loader loading={loading} /> // Use the Loader component while fetching data
      ) : drawData.length === 0 || finalMatch.length === 0 ? ( // Check for no matches in finalMatch
        <NoData message={t('common.no_data')} /> // Display NoData component if no matches are found
      ) : (
        <div className="bracket1">
          <h3 className="heading">{t('draw.final')}</h3> {/* Translate heading */}
          <div className="cont">
            <div className='match-fourth'>
              {finalMatch.map(renderMatch)}
              <div className="medal-container">
                <img src="/final.png" alt="Medal" className="medal-image" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fourth;
