// src/components/Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Loader.css';

const Loader = ({ loading }) => {
  return (
    <div className="loader-container">
      <ClipLoader color="#FFA500" loading={loading} size={50} />
    </div>
  );
};

export default Loader;
