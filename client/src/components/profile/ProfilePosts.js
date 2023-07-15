import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const ProfilePosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/followingposts", {
          withCredentials: true,
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className='profile-posts'>
      {posts.map((post) => (
        <div className='profile-post' key={post.id}>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfilePosts;
