import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const ProfileVideo = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getuser", {
          withCredentials: true,
        });
        setPosts(response.data.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='profile-posts'>
      {posts.map((post) => (
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
      ))}
    </div>
  );
};

export default ProfileVideo;
