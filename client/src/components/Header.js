import React from 'react';
import { BiSearchAlt, BiMessageSquareDots } from 'react-icons/bi';
import { IoMdNotificationsOutline } from 'react-icons/io';
import landingLogo from '../assets/homeLogo-dark.png';
import man1 from "../assets/man1.jpg";
import './header.css';
import { Outlet } from 'react-router-dom';
import DarkMode from './DarkMode';


const Header = () => {
  return (
    <div className='nav-container'>
    <div className='navbar-home'>
        <div className='navbar-left'>
          <div className='logo'>
            <img src={landingLogo} alt='landing' />
            <h1>Solitaro</h1>
          </div>
        </div>
        <div className='navbar-center'>
          <h3>Explore</h3>
          <div className='search-bar'>
            <input type='text' placeholder='Find friends, communities here...' />
            <i className='search-icon'><BiSearchAlt /></i>
          </div>
        </div>
        <div className='navbar-right'>
          <div className='nav-icon'>
            <i><BiMessageSquareDots /></i>
          </div>
          <div className='nav-icon'>
            <i><IoMdNotificationsOutline /></i>
          </div>
          <div className='nav-image'>
            <img src={man1} alt='man' />
          </div>
          <DarkMode />
        </div>
      </div>
      <Outlet />
      </div>
  )
}

export default Header;