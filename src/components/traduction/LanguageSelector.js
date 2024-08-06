import React from 'react';

const availableLanguages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' }
];

const availableTimeZones = [
  { code: 'UTC', label: 'UTC' },
  { code: 'GMT', label: 'GMT' },
  { code: 'PST', label: 'PST' },
  { code: 'EST', label: 'EST' }
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange, selectedTimeZone, onTimeZoneChange }) => {
  return (
    <div className="language-timezone-selector">
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="language-selector"
      >
        {availableLanguages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
      <select
        value={selectedTimeZone}
        onChange={(e) => onTimeZoneChange(e.target.value)}
        className="timezone-selector"
      >
        {availableTimeZones.map((zone) => (
          <option key={zone.code} value={zone.code}>
            {zone.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
