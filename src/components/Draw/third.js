import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { fetchTeamData } from '../../Services/teamService'; // Ensure this service is correctly imported
import './first.css'; // Reuse the same styles if applicable
import NoData from '../NoData/NoData'; // Import the NoData component
import Loader from '../Loader/Loader'; // Import the Loader component

const Third = ({ seasonId }) => { // Accept seasonId as a prop
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
      const allMatches = drawData; // Use the API data

      for (const match of allMatches) {
        const teamIds = [match.home_id, match.away_id];
        for (const teamId of teamIds) {
          if (!logos[teamId]) {
            try {
              const teamData = await fetchTeamData(teamId);
              logos[teamId] = teamData.img || 'default-logo-url.png';
              console.log(`Fetched logo for team ${teamId}:`, teamData.img); // Debugging line
            } catch (error) {
              console.error(`Error fetching data for team ${teamId}:`, error);
              logos[teamId] = 'default-logo-url.png'; // fallback in case of error
            }
          }
        }
      }
      setTeamLogos(logos);
    };

    if (drawData.length > 0) { // Ensure we only fetch logos when drawData is available
      fetchLogos();
    }
  }, [drawData]);

  useEffect(() => {
    console.log('Team logos in Third:', teamLogos); // Debugging line
  }, [teamLogos]);

  // Filter the data for Semi-finals and Final
  const semifinalMatches = drawData.filter((match) => match.group_name === 'Semifinals');
  const finalMatch = drawData.filter((match) => match.group_name === 'Final');

  const renderMatch = (match) => (
    <div className="matchup" key={match.id}>
      <div className="container-first">
        <div className="match-details-first">
          <div className="team-first">
            <span className="team-name-first">
              <img
                src={teamLogos[match.home_id] || 'default-logo-url.png'}
                alt={match.home_name}
                className="team-logo-first"
              />
              {match.home_name}
            </span>
          </div>
          <div className="team-first">
            <span className="team-name-first">
              <img
                src={teamLogos[match.away_id] || 'default-logo-url.png'}
                alt={match.away_name}
                className="team-logo-first"
              />
              {match.away_name}
            </span>
          </div>
        </div>
        <div className="team-scores-container">
          <span className="team-score-first">{match.overall_result.home}</span>
          <span className="team-score-first">{match.overall_result.away}</span>
        </div>
      </div>
      <button className="h2h-button-first">H2H</button>
    </div>
  );

  const renderBracket = () => {
    return semifinalMatches.map((match, index) => {
      // Pairing Semifinal matches with Final match
      if (index % 2 === 0) {
        return (
          <div className="pair-container" key={index}>
            <div className="round16-pair">
              {renderMatch(semifinalMatches[index])}
              {semifinalMatches[index + 1] && renderMatch(semifinalMatches[index + 1])}
            </div>
            <div className="line-connector">
              <div className="middle-line"></div>
            </div>
            <div className="quarterfinal">
              {finalMatch[0] && renderMatch(finalMatch[0])}
            </div>
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="first-container">
      {loading ? (
        <Loader loading={loading} /> // Use the Loader component while fetching data
      ) : drawData.length === 0 ? (
        <NoData message={t('common.no_data')} /> // Display NoData component if no matches are found
      ) : (
        <div className="bracket">
          <h3 className="heading">
            {t('draw.round_semi_finals')} {t('draw.round_final')}
          </h3>
          {renderBracket()}
        </div>
      )}
    </div>
  );
};

export default Third;
