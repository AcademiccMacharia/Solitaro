import React from 'react';
import './settings.css';

const Settings = () => {
    return (
        <div className='settings'>
            <div className='settings-header'>
            <h1>Settings</h1>
            </div>
            <div className='settings-list'>
                <div className='setting'>
                    <h3>Account</h3>
                    <p>Change your password, email, or username</p>
                </div>
                <div className='setting'>
                    <h3>Edit profile</h3>
                    <p>Edit your profile</p>
                </div>
                <div className='setting'>
                    <h3>Verification</h3>
                    <p>Verify your account</p>
                </div>
                <div className='setting'>
                    <h3>Logout</h3>
                    <p>Logout of your account</p>
                </div>
                <div className='setting'>
                    <h3>Delete Account</h3>
                    <p>Delete your account</p>
                </div>
            </div>
        </div>
    )
}

export default Settings