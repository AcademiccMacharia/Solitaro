import React, { useState, useEffect } from 'react';
import verified from '../../assets/verified.png';
import { BsCameraVideo } from 'react-icons/bs';
import { MdOutlineInsertPhoto, MdOutlineAddToPhotos } from 'react-icons/md';
import './profile.css';
import { Link, Outlet } from 'react-router-dom';
import placeholder2 from '../../assets/placeholder2.png';
import axios from 'axios';
import Footer from '../Footer';

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);


  const fetchProfile = async () => {
    const response = await axios.get('http://localhost:5000/profile', { withCredentials: true });
    console.log(response)
    try {
      if (response.data.success) {
        setProfile(response.data.data)
      }
    } catch (err) {
      alert(err)
    }
  };



  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className='profile'>
      <div className='profile-body'>
        <div className='profile-body-top'>
          <h1>Profile</h1>
          <div className='profile-info'>
            <div className='profile-image'>
              <img src={profile.dp_url ? profile.dp_url : placeholder2} alt='man' />
            </div>
            <div className='username'>
              <div className='verification'>
                <h3>{profile.full_name}</h3>
                <img src={verified} alt='verified' />
              </div>
              <p>@{profile.username}</p>
            </div>
          </div>
          <div className='profile-bio'>
            <p>{profile.bio}</p>
          </div>
          <div className='profile-stats'>
            <div className='profile-stat'>
              <h3>Posts</h3>
              <p>{profile.posts_count}</p>
            </div>
            <div className='profile-stat'>
              <h3><Link to='/relationships' className='link'>Followers</Link></h3>
              <p>{profile.followers_count}</p>
            </div>
            <div className='profile-stat'>
              <h3><Link to='/relationships/following' className='link'>Following</Link></h3>
              <p>{profile.following_count}</p>
            </div>
          </div>
        </div>
        <div className='profile-body-bottom'>
          <div className='profile-body-content'>
            <div className='profile-nav'>
              <ul>
                <Link className='link' to='/profile'><li><span><MdOutlineInsertPhoto size={20} /></span>Posts</li></Link>
                <Link className='link' to='/profile/photos'><li><span><MdOutlineAddToPhotos size={20} /></span>Photos</li></Link>
                <Link className='link' to='/profile/videos'><li><span><BsCameraVideo size={20} /></span>Videos</li></Link>
              </ul>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default Profile