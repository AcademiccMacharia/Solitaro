import React, { useEffect, useState } from 'react';

import { TbLogout } from 'react-icons/tb';
import { FaRunning } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import landingLogo from '../assets/homeLogo-dark.png';
import './header.css';
import { Outlet, Link } from 'react-router-dom';
import placeholder2 from '../assets/placeholder2.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import DarkMode from './DarkMode';
import Search from './Search';

const Header = () => {
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState([]);

  const logoutUser = async () => {
    try {
      await axios.get("http://localhost:5000/logout", {
        withCredentials: true,
      });

      alert('Logout successful. Redirecting...');
      setTimeout(() => {
        navigate("/landing");
      }, 500);

    } catch (error) {
      toast.error("Failed to logout");
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const fetchProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
      if (response.data.success) {
        setProfile(response.data.data);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://localhost:8000/notification", {
        withCredentials: true,
      });
      setNotifications(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  }

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
          <Search />
        </div>
        <div className="navbar-right">
          <div className="nav-icon" onClick={toggleNotifications}>
            <i>
              <IoMdNotificationsOutline />
            </i>
          </div>
          <div className="nav-icon" id="message-icon">
            <i className='default-icon'>
              <TbLogout onClick={logoutUser}/>
            </i>
            <i className='hover-icon'>
              <FaRunning />
            </i>
          </div>
          <div className="nav-image">
            <img src={profile.dp_url ? profile.dp_url : placeholder2} alt="man" />
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
          {notifications.length === 0 ? (
            <div className="notification">
              <p>No recent notifications</p>
            </div>
          ) : (
            notifications
              .filter((notification) => !notification.IsRead)
              .map((notification) => (
                <div className="notification" key={notification.notification_id}>
                  <p>{notification.description}</p>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
