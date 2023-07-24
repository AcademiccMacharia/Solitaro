import React, {useState, useEffect} from 'react';
import axios from 'axios';
import placeholder from '../../assets/placeholder2.png';
import verified from '../../assets/verified.png';
import { Link } from 'react-router-dom';

const Following = () => {
    const [followings, setFollowing] = useState(null);

    const fetchFollowing = async () => {
        try {
          const response = await axios.get('http://localhost:5051/following', { withCredentials: true });
          console.log(response);
          try {
            if (response.data.success) {
              setFollowing(response.data.data);
            }
          } catch (err) {
            alert(err);
          }
        } catch (err) {
          alert(err);
        }
      }

      useEffect(() => {
        fetchFollowing();
      }, []);

      const UnfollowUser = async (followed_user_id) => {
        console.log(followed_user_id)
        try {
          const response = await axios.delete(`http://localhost:5051/unfollow/${followed_user_id}`, {
            withCredentials: true,
          });
          console.log(response)
          if (response.status === 200 && response.data.success) {
            alert(response.data.message);
            fetchFollowing();
          } else {
            console.error("Failed to unfollow user:", response.data.message);
          }
        } catch (error) {
          console.error("Error unfollowing user:", error);
        }
      }


  return (
    <div className='relationship-body'>
        <div className='following-list'>
            {followings && followings.length > 0 ? (
              followings.map((following) => (
                <div className='following' key={following.user_id}>
                  <div className='following-image'>
                  <Link to={`/user/${following.user_id}`} className='link'>
                    <img src={following.dp_url ? following.dp_url : placeholder} alt='man' />
                  </Link>
                  </div>
                  <div className='following-info'>
                    <div className='verification'>
                      <h3>{following.full_name}</h3>
                      <img src={verified} alt='verified' />
                    </div>
                    <p>@{following.username}</p>
                  </div>
                  <div className='follow-button'>
                    <button onClick={() => UnfollowUser(following.user_id)}>Unfollow</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Who you are following will appear here...</p>
            )}
          </div>
    </div>
  )
}

export default Following