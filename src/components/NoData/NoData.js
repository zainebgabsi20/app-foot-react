import React from 'react';
import './NoData.css';

const NoData = ({ message }) => {
  return (
    <div className="empty-data-container">
      <img src="/no-data.png" alt="No data" className="no-data-icon" />
    </div>
  );
};

export default NoData;
