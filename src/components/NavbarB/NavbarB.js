import React from 'react';
import { FaTimes, FaSync } from 'react-icons/fa';
import logo from '../../logo_orange.png'; // Assurez-vous que le chemin du logo est correct
import './NavbarB.css';

const Navbarb = ({ onClose, onRefresh }) => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="icon-button left" onClick={onClose}>
          <FaTimes />
        </button>
      </div>
      <div className="navbar-center">
        <img src={logo} alt="Logo Orange" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <button className="icon-button right" onClick={onRefresh}>
          <FaSync />
        </button>
      </div>
    </div>
  );
};

export default Navbarb;
