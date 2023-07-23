import React, {useState, useEffect} from 'react';
import axios from 'axios';
import placeholder from '../../assets/placeholder2.png';
import verified from '../../assets/verified.png';

const Followers = () => {
    const [followers, setFollowers] = useState(null);

    const fetchFollowers = async () => {
        try {
          const response = await axios.get('http://localhost:5051/followers', { withCredentials: true });
          console.log(response);
          try {
            if (response.data.success) {
              setFollowers(response.data.data);
            }
          } catch (err) {
            alert(err);
          }
        } catch (err) {
          alert(err);
        }
      }

      useEffect(() => {
        fetchFollowers();
      }, []);


  return (
    <div className='relationship-body'>
        <div className='following-list'>
            {followers && followers.length > 0 ? (
              followers.map((follower) => (
                <div className='following' key={follower.user_id}>
                  <div className='following-image'>
                    <img src={follower.dp_url ? follower.dp_url : placeholder} alt='man' />
                  </div>
                  <div className='following-info'>
                    <div className='verification'>
                      <h3>{follower.full_name}</h3>
                      <img src={verified} alt='verified' />
                    </div>
                    <p>@{follower.username}</p>
                  </div>
                  <div className='follow-button'>
                    <button>Follow</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Followers will appear here...</p>
            )}
          </div>
    </div>
  )
}

export default Followers