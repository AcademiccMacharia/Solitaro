import React, { useEffect, useState } from 'react';
import { BiSearchAlt, BiMessageSquareDots } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import landingLogo from '../assets/homeLogo-light.png';
import man1 from '../assets/man1.jpg';
import './header.css';
import { Outlet, Link } from 'react-router-dom';
import axios from 'axios';
import DarkMode from './DarkMode';

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("http://localhost:8000/notifications", {
          withCredentials: true,
        });
        setNotifications(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="nav-container">
      <div className="navbar-home">
        <div className="navbar-left">
          <div className="logo">
            <img src={landingLogo} alt="landing" />
            <h1>
              <Link className="link" to="/home">
                Solitaro
              </Link>
            </h1>
          </div>
        </div>
        <div className="navbar-center">
          <h3>Explore</h3>
          <div className="search-bar">
            <input type="text" placeholder="Find friends, communities here..." />
            <i className="search-icon">
              <BiSearchAlt />
            </i>
          </div>
        </div>
        <div className="navbar-right">
          <div className="nav-icon" onClick={toggleNotifications}>
            <i>
              <IoMdNotificationsOutline />
            </i>
          </div>
          <div className="nav-icon">
            <i>
              <BiMessageSquareDots />
            </i>
          </div>
          <div className="nav-image">
            <img src={man1} alt="man" />
          </div>
          <DarkMode />
        </div>
      </div>
      <Outlet />
      <div className={`notifications-container ${showNotifications ? 'visible' : ''}`}>
        <div className="notifications-header">
          <h3>Notifications</h3>
        </div>
        <div className="notifications-list">
          {notifications.map((notification, index) => (
            <div className="notification" key={index}>
              <p>{notification}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
