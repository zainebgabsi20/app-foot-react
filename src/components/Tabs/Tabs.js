import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import the translation hook
import './Tabs.css';
import Lineup from './Lineup';
import Comment from './Comment';
import H2H from './H2H';
import Substitutes from './Substitutes';
import Incidents from './Incidents';
import Stats from './Stats';

const Tabs = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const [activeTab, setActiveTab] = useState('Incidents');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Stats':
        return <Stats />;
      case 'Incidents':
        return <Incidents />;
      case 'H2H':
        return <H2H />;
      case 'Comment':
        return <Comment />;
      case 'Lineups':
        return <Lineup />;
      case 'Substitutes':
        return <Substitutes />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="tabs-container">
        {['Incidents', 'Comment', 'Lineups', 'Substitutes', 'Stats', 'H2H'].map((tab) => (
          <button
            key={tab}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {t(`common.${tab.toLowerCase()}`)} {/* Use translations */}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default Tabs;
