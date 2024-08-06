import React from 'react';
import { FaTimes, FaSync } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onClose, onRefresh }) => {
  return (
    <div className="navbar1">
      <button className="icon-button1 left" onClick={onClose}>
        <FaTimes />
      </button>
      <button className="icon-button1 right" onClick={onRefresh}>
        <FaSync />
      </button>
    </div>
  );
};

export default Navbar;
