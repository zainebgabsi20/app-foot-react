import React, { useState, useEffect } from 'react';
import './TeamTabs.css';
import TeamDetails from '../TeamDetails/TeamDetails';
import NewsComponent from './News';
import SquadComponent from './Squad';
import Matches from './Matches';
const TeamTabs = ({ teamId }) => {
  const [activeTab, setActiveTab] = useState('Info');

  useEffect(() => {
    console.log('teamID in TeamTabs', teamId);
  }, [teamId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Info':
        console.log('teamID in teamtab - Info', teamId);
        return <TeamDetails teamId={teamId} />; // Pass teamId to TeamDetails
      case 'Matches':
        return <Matches teamId={teamId} />; // Replace with your Matches component
      case 'Squad':
        console.log('teamID in teamtab - Squad', teamId);
        return <SquadComponent teamId={teamId} />; // Pass teamId to SquadComponent
      case 'News':
        return <NewsComponent teamId={teamId} />; // Replace with your News component
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="team-tabs-container">
        {['Info', 'Matches', 'Squad', 'News'].map((tab) => (
          <button
            key={tab}
            className={`team-tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="team-tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeamTabs;
