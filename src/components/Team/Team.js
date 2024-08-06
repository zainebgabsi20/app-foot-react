import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Team.css'; // Ensure you have appropriate styles
import TeamTabs from '../TeamTabs/TeamTabs';

const Team = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="team-container">
      <div className="team-details-header">
        <button className="custom-arrow-button" onClick={handleBack}>
          <svg viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.41 16.58L10.83 12 15.41 7.41 14 6l-6 6 6 6z" />
          </svg>
        </button>
        <h2 className="team-details-title">Teams</h2>
      </div>
     
      <div className="tabs-team">
        <TeamTabs teamId={teamId} />
      </div>
    </div>
  );
};

export default Team;
