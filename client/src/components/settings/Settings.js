import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './settings.css';
import Footer from '../Footer';

const Settings = () => {
    return (
        <div className='settings'>
            <div className='settings-header'>
            <h1>Settings</h1>
            </div>
            <div className='setting-body'>
            <div className='settings-list'>
                <div className='setting'>
                <Link className='link' to='/settings'><h3>Account</h3></Link>
                    <p>Change your password.</p>
                </div>
                <div className='setting'>
                <Link className='link' to='/settings/editprofile'><h3>Edit profile</h3></Link>
                    <p>Edit your profile.</p>
                </div>
                <div className='setting'>
                <Link className='link' to='/settings/verification'><h3>Verification</h3></Link>
                    <p>Verify your account.</p>
                </div>
                <div className='setting'>
                <Link className='link' to='/settings/deleteaccount'><h3>Delete Account</h3></Link>
                    <p>Delete your account.</p>
                </div>
            </div>
            <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Settings