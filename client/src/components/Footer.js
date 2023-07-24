import React, { useState } from 'react';
import { CgLivePhoto } from 'react-icons/cg';
import {AiFillHome, AiFillMessage, AiFillSetting} from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { MdNotifications } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [activeLink, setActiveLink] = useState('Home');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };


    return (
        <div className='footer-container'>
            <ul>
                <Link className="link" to='/home'>
                <li
                    className={activeLink === 'Home' ? 'active' : ''}
                    onClick={() => handleLinkClick('Home')}
                >
                    <AiFillHome color={activeLink === 'Home' ? 'gold' : 'gray'} />
                </li>
                </Link>
                <Link className='link' to='/messages'><li
                    className={activeLink === 'Messages' ? 'active' : ''}
                    onClick={() => handleLinkClick('Messages')}
                >
                    <AiFillMessage color={activeLink === 'Messages' ? 'gold' : 'gray'} />
                </li></Link>
                <Link className='link' to='/notifications'><li
                    className={activeLink === 'Notifications' ? 'active' : ''}
                    onClick={() => handleLinkClick('Notifications')}
                >
                    <MdNotifications color={activeLink === 'Notifications' ? 'gold' : 'gray'} />
                </li></Link>
                <Link className="link" to='/profile'><li
                    className={activeLink === 'Profile' ? 'active' : ''}
                    onClick={() => handleLinkClick('Profile')}
                >
                    <BiSolidUser color={activeLink === 'Profile' ? 'gold' : 'gray'} />
                </li></Link>
                <Link className="link" to='/settings'><li
                    className={activeLink === 'Settings' ? 'active' : ''}
                    onClick={() => handleLinkClick('Settings')}
                >
                    <AiFillSetting color={activeLink === 'Settings' ? 'gold' : 'gray'} />
                </li></Link>
            </ul>
        </div>
    )
}

export default Footer