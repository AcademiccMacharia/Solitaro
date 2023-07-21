import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './profile.css';

const ProfilePhotos = () => {
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
        <div className='profile-post' key={post.id}>
          {post.image_url !== null &&
            <img src={post.image_url} alt='profile-post' />
          }
        </div>
      ))}
    </div>
  )
}

export default ProfilePhotos