// src/components/Loading/Loading.js
import React from 'react';
import './Loading.css'; // Make sure to create a corresponding CSS file for the styles

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-bar"></div>
      <div className="loading-text">
        Loading<span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    </div>
  );
};

export default Loading;
