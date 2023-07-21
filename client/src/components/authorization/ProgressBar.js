import React from 'react';
import './login.css';

const ProgressBar = ({ percentage }) => {
  return (
    <div className='progress-bar'>
      <div className='progress' style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
