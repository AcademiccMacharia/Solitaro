import React from 'react';
import { Navigate } from 'react-router-dom';
import './settings.css';
import axios from 'axios';

const Logout = () => {
    
    const logoutUser = async () => {
        try {
          await axios.get('http://localhost:5000/logout');
          alert('Logout successful. Redirecting...');
          return <Navigate to="/soli" />;
        } catch (error) {
          console.error('Logout failed:', error);
          alert('Logout unsuccessful. Please make sure you are logged in.');
        }
      };
      

  return (
    <div className='logout'>
        <h1>Logout</h1>
        <p>Click the button below to log out.</p>
        <button className="social-btn" onClick={logoutUser}>Logout</button>
    </div>
  )
}

export default Logout;