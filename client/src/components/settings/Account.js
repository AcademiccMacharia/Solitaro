import React from 'react'
import './settings.css';

const Account = () => {
  return (
    <div className='account'>
        <h1>Account</h1>
        <p>Change your password.</p>
        <form className='account-form'>
            <div className='account-fields'>
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" />
            </div>
            <div className='account-fields'>
            <label htmlFor="newpassword">New Password:</label>
            <input type="password" name="newpassword" id="newpassword" />
            </div>
            <div className='account-fields'>
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input type="password" name="confirmpassword" id="confirmpassword" />
            </div>
        </form>
        <button type="submit">Save Changes</button>
    </div>
  )
}

export default Account