import React, { useState } from 'react';
import './LeagueFilterDropdown.css';

const LeagueFilterDropdown = ({ leagues, selectedLeagues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (league) => {
    if (selectedLeagues.includes(league)) {
      onChange(selectedLeagues.filter((l) => l !== league));
    } else {
      onChange([...selectedLeagues, league]);
    }
  };

  return (
    <div className="league-filter-dropdown">
      <button className="filter-button" onClick={toggleDropdown}>
        Filtrer
      </button>
      {isOpen && (
        <div className="dropdown-content">
          {leagues.map((league, index) => (
            <div key={index} className="dropdown-item">
              <input
                type="checkbox"
                id={`league-${index}`}
                checked={selectedLeagues.includes(league.name)}
                onChange={() => handleCheckboxChange(league.name)}
              />
              <span>{league.name}</span>
            </div>
          ))}
          <div className="dropdown-footer">
            <button>Voir Plus</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeagueFilterDropdown;
