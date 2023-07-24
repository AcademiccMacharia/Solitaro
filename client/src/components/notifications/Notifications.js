import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './notifications.css';
import Footer from '../Footer';

const Notifications = () => {
  const [activeLink, setActiveLink] = useState('All');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <>
      <div className='notifications'>
        <div className='notification-header'>
          <Link
            className={`link ${activeLink === 'All' ? 'active' : ''}`}
            to='/notifications'
            onClick={() => handleLinkClick('All')}
          ><button>
              All
            </button></Link>
          <Link
            className={`link ${activeLink === 'Comments' ? 'active' : ''}`}
            to='/notifications/comment'
            onClick={() => handleLinkClick('Comments')}
          >
            <button>
              My Comments
            </button></Link>
          <Link
            className={`link ${activeLink === 'Likes' ? 'active' : ''}`}
            to='/notifications/likes'
            onClick={() => handleLinkClick('Likes')}
          >
            <button>
              My Likes
            </button></Link>
        </div>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Notifications