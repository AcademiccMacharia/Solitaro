import React from 'react';
import marcus from '../../assets/man4.jpg';
import wrestling from '../../assets/wrestling.jpg';
import './profile.css';

const ProfilePhotos = () => {
  return (
    <div className='profile-posts'>
    <div className='profile-post'>
      <img src={wrestling} alt='post' />
      <img src={marcus} alt='post' />
    </div>
  </div>
  )
}

export default ProfilePhotos