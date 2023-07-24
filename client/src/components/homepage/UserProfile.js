import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import placeholder2 from '../../assets/placeholder2.png';
import verified from '../../assets/verified.png';
import { MdOutlineInsertPhoto } from 'react-icons/md';

const UserProfile = () => {
  const { userId } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/${userId}`, {
          withCredentials: true,
        });
        console.log(response)
        if (response.data.success) {
          setUserProfile(response.data.data);
        } else {
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error:', error);
        setUserProfile(null);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile'>
      <div className='profile-body'>
        <div className='profile-body-top'>
          <h1>User Profile</h1>
          <div className='profile-info'>
            <div className='profile-image'>
              <img src={userProfile.dp_url ? userProfile.dp_url : placeholder2} alt='man' />
            </div>
            <div className='username'>
              <div className='verification'>
                <h3>{userProfile.full_name}</h3>
                <img src={verified} alt='verified' />
              </div>
              <p>@{userProfile.username}</p>
            </div>
          </div>
          <div className='profile-bio'>
            <p>{userProfile.bio}</p>
          </div>
          <div className='profile-stats'>
            <div className='profile-stat'>
              <h3>Posts</h3>
              <p>{userProfile.posts_count}</p>
            </div>
            <div className='profile-stat'>
              <h3><Link to='/relationships' className='link'>Followers</Link></h3>
              <p>{userProfile.followers_count}</p>
            </div>
            <div className='profile-stat'>
              <h3><Link to='/relationships/following' className='link'>Following</Link></h3>
              <p>{userProfile.following_count}</p>
            </div>
          </div>
        </div>
        <div className='profile-body-bottom'>
          <div className='profile-body-content'>
            <div className='profile-nav'>
              <ul>
                <Link className='link' to='/profile'><li><span><MdOutlineInsertPhoto size={20} /></span>Posts</li></Link>
              </ul>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
