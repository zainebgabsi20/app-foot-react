import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import './Home.css';
import logo from '../../logo_orange.png';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    console.log('Close button clicked');
  };

  const handleRefresh = () => {
    console.log('Refresh button clicked');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="home-container">
      <Navbar onClose={handleClose} onRefresh={handleRefresh} />
      <div className="title-bar">
        <h1 className="title">Orange Sport Widget</h1>
      </div>
      <div className="background-image" />
      <div className="content">
        <img src={logo} alt="Orange Logo" className="logo-orange" />
        {isLoading && (
          <div className="loading-container">
            <div className="loading-bar"></div>
            <div className="loading-text">
              Loading<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
