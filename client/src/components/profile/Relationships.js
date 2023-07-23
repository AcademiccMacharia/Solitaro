import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import './profile.css';

const Relationships = () => {
  return (
    <div className='relationships'>
        <div className='relationships-header'>
            <h3><Link className='link' id="active" to='/relationships'>Followers</Link></h3>
            <h3><Link className='link' to='/relationships/following'>Following</Link></h3>
    </div>
    <Outlet />
    </div>
  )
}

export default Relationships