import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserPosts = () => {
  const { userId } = useParams();
  const [posts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`http://localhost:5051/userposts/${userId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserPosts(response.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  return (
    <div className='profile-posts'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div className='profile-post' key={post.post_id}>
            {post.video_url && (
              <video controls>
                <source src={post.video_url} type='video/mp4' />
              </video>
            )}
            {post.image_url && (
              <img src={post.image_url} alt='profile-post' />
            )}
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default UserPosts;
