import React, { useState, useEffect } from 'react';
import './homepage.css';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import verified from '../../assets/verified.png';
import man1 from '../../assets/man1.jpg';
import man2 from '../../assets/man2.jpg';
import woman1 from '../../assets/woman1.jpg';
import woman4 from '../../assets/woman3.jpg';
import {MdCancel} from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

import axios from 'axios';

const Homepage = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [profile, setProfile] = useState(null);
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const fetchProfile = async () => {
    const response = await axios.get('http://localhost:5000/getuser', { withCredentials: true });
    console.log(response);
    try {
      if (response.data.success) {
        setProfile(response.data.data.profile);
      }
    } catch (err) {
      alert(err);
    }
  };

  const handleFileChange = (event, type) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.type.includes('image/') && type === 'image') {
        setImageFile(selectedFile);
        setImagePreview(URL.createObjectURL(selectedFile));
      } else if (selectedFile.type.includes('video/') && type === 'video') {
        setVideoFile(selectedFile);
        setVideoPreview(URL.createObjectURL(selectedFile));
      } else {
        alert('Invalid file type. Please select an image (jpg, png, jpeg) or a video (mp4, mp3).');
      }
    }
  };

  const handleImageCancel = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleVideoCancel = () => {
    setVideoPreview(null);
    setVideoFile(null);
  };

  const uploadMedia = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'solitaro');
    data.append('cloud_name', 'dyqny6kxs');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dyqny6kxs/upload', {
        method: 'post',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Media upload failed.');
      }

      const responseData = await response.json();
      return responseData.url;
    } catch (err) {
      console.error(err);
      alert('Media upload failed. Please try again.');
      return null;
    }
  };


  const createPost = async () => {
    const imageUrl = await uploadMedia(imageFile);
    const videoUrl = await uploadMedia(videoFile);

    const data = {
      content: content,
      image_url: imageUrl,
      video_url: videoUrl,
    };

    try {
      const response = await axios.post('http://localhost:5051/posts', data, { withCredentials: true });
      if (response.data.success) {
        alert(response.data.message);
        // Reset the content and file previews after successful post
        setContent('');
        setImagePreview(null);
        setVideoPreview(null);
        setImageFile(null);
        setVideoFile(null);
      } else {
        alert('Failed to create post. Please try again.');
      }
    } catch (err) {
      alert('Error creating post. Please try again.');
      console.error(err);
    }
  };

  const uploadImage = async () => {
    const imageUrl = await uploadMedia(imageFile);
    if (imageUrl) {
      alert('Image uploaded successfully!');
    }
  };

  const uploadVideo = async () => {
    const videoUrl = await uploadMedia(videoFile);
    if (videoUrl) {
      alert('Video uploaded successfully!');
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className='homepage'>
      <div className='homepage-container'>
        <div className='profile-container'>
          <div className='profile-info'>
            <div className='profile-image'>
              <img src={profile.dp_url} alt='man' />
            </div>
            <div className='username'>
              <div className='verification'>
                <h3>{profile.full_name}</h3>
                <img src={verified} alt='verified' />
              </div>
              <p>@{profile.username}</p>
            </div>
          </div>
          <div className='profile-stats'>
            <div className='profile-stat'>
              <p>Posts</p>
              <p>{profile.posts_count}</p>
            </div>
            <div className='profile-stat'>
              <p>Followers</p>
              <p>{profile.followers_count}</p>
            </div>
            <div className='profile-stat'>
              <p>Following</p>
              <p>{profile.following_count}</p>
            </div>
          </div>
        </div>
        <div className='links-container'>
          <ul>
            <li
              className={activeLink === 'Home' ? 'active' : ''}
              onClick={() => handleLinkClick('Home')}
            >
              <CiHome size={20} color={activeLink === 'Home' ? 'gold' : 'black'} /> <span>Home</span>
            </li>
            <Link className='link' to='/messages'><li
              className={activeLink === 'Messages' ? 'active' : ''}
              onClick={() => handleLinkClick('Messages')}
            >
              <PiMessengerLogoThin size={20} color={activeLink === 'Messages' ? 'gold' : 'black'} /> <span>Live Chat</span>
            </li></Link>
            <li
              className={activeLink === 'Go Live' ? 'active' : ''}
              onClick={() => handleLinkClick('Go Live')}
            >
              <CgLivePhoto size={20} color={activeLink === 'Go Live' ? 'gold' : 'black'} /> <span>Go Live</span>
            </li>
            <li
              className={activeLink === 'Notifications' ? 'active' : ''}
              onClick={() => handleLinkClick('Notifications')}
            >
              <IoMdNotificationsOutline size={20} color={activeLink === 'Notifications' ? 'gold' : 'black'} /> <span>Notifications</span>
            </li>
            <Link className="link" to='/profile'><li
              className={activeLink === 'Profile' ? 'active' : ''}
              onClick={() => handleLinkClick('Profile')}
            >
              <CiUser size={20} color={activeLink === 'Profile' ? 'gold' : 'black'} /> <span>Profile</span>
            </li></Link>
            <Link className="link" to='/settings'><li
              className={activeLink === 'Settings' ? 'active' : ''}
              onClick={() => handleLinkClick('Settings')}
            >
              <CiSettings size={20} color={activeLink === 'Settings' ? 'gold' : 'black'} /> <span>Settings</span>
            </li></Link>
          </ul>
        </div>
        <div className='community-container'>
          <div className='community-header'>
            <h3>Communities</h3>
            <button><span>+</span></button>
          </div>
          <div className='community-list'>
            <div className='community'>
              <img src={woman4} alt='man' />
              <p>Ux Designer community</p>
            </div>
            <div className='community'>
              <img src={woman1} alt='man' />
              <p>Backbenchers community</p>
            </div>
          </div>
        </div>
        <div className='feeds-container'>
          <div className='stories'>
            <div className='story'>
              <img src={woman1} alt='man' />
            </div>
            <div className='story'>
              <img src={man2} alt='man' />
            </div>
            <div className='story'>
              <img src={woman4} alt='man' />
            </div>
            <div className='story'>
              <img src={man1} alt='man' />
            </div>
            <div className='story'>
              <img src={woman4} alt='man' />
            </div>
            <div className='story'>
              <img src={man2} alt='man' />
            </div>
            <div className='story'>
              <img src={woman1} alt='man' />
            </div>
            <div className='story'>
              <img src={man1} alt='man' />
            </div>
            <div className='story'>
              <img src={man1} alt='man' />
            </div>
            <div className='story'>
              <img src={woman4} alt='man' />
            </div>
            <div className='story'>
              <img src={man2} alt='man' />
            </div>
            <div className='story'>
              <img src={woman4} alt='man' />
            </div>
            <div className='story'>
              <img src={man1} alt='man' />
            </div>
          </div>
          <div className='create-post'>
            <div className='create-post-top'>
              <div className='profile-image'>
                <img src={profile.dp_url} alt='man' />
              </div>
              <div className='post-input'>
                <input
                  type='text'
                  onChange={handleContentChange}
                  value={content}
                  placeholder='What is on your mind?'
                />
              </div>
              <button className='social-btn' onClick={createPost}>Post It!</button>
            </div>
            <div className='media-preview'>
                {imagePreview && <img src={imagePreview} alt='preview' />
                }
                {imagePreview !== null &&
                  <MdCancel onClick={handleImageCancel} size={20}/>
                }
                {videoPreview && (
                  <video controls>
                    <source src={videoPreview} type={videoFile?.type} />
                    Your browser does not support the video tag.
                  </video>
                )}
                {videoPreview !== null &&
                  <MdCancel className='upload-cancel' onClick={handleVideoCancel} size={20}/>
                }
              </div>
              <div className='upload-buttons'>
                <label htmlFor='imageInput'>
                  <button onClick={uploadImage}>Upload Photo</button>
                </label>
                <input
                  type='file'
                  id='imageInput'
                  accept='image/*'
                  onChange={(event) => handleFileChange(event, 'image')}
                />
                <label htmlFor='videoInput'>
                  <button onClick={uploadVideo}>Upload Video</button>
                </label>
                <input
                  type='file'
                  id='videoInput'
                  accept='video/*'
                  onChange={(event) => handleFileChange(event, 'video')}
                />
              </div>
          </div>
          <div className='post-view'>
            <h3>
              <Link
                className={`link ${activeLink === 'Feeds' ? 'active' : ''}`}
                to='/home/feed'
                onClick={() => handleLinkClick('Feeds')}
              >
                Feeds
              </Link>
            </h3>
            <h3>
              <Link
                className={`link ${activeLink === 'For You' ? 'active' : ''}`}
                to='/home'
                onClick={() => handleLinkClick('For You')}
              >
                For You
              </Link>
            </h3>
          </div>
          <Outlet />
        </div>
        <div className='following-container'>
          <div className='following-header'>
            <h3>Following</h3>
            <p>See All</p>
          </div>
          <div className='following-list'>
            <div className='following'>
              <div className='following-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='following-info'>
                <div className='verification'>
                  <h3>Dwayne Johnson</h3>
                  <img src={verified} alt='verified' />
                </div>
                <p>@dwayne</p>
              </div>
              <div className='follow-button'>
                <button>Follow</button>
              </div>
            </div>
            <div className='following'>
              <div className='following-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='following-info'>
                <div className='verification'>
                  <h3>Dwayne Johnson</h3>
                  <img src={verified} alt='verified' />
                </div>
                <p>@dwayne</p>
              </div>
              <div className='follow-button'>
                <button>Follow</button>
              </div>
            </div>
            <div className='following'>
              <div className='following-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='following-info'>
                <div className='verification'>
                  <h3>Dwayne Johnson</h3>
                  <img src={verified} alt='verified' />
                </div>
                <p>@dwayne</p>
              </div>
              <div className='follow-button'>
                <button>Follow</button>
              </div>
            </div>
            <div className='following'>
              <div className='following-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='following-info'>
                <div className='verification'>
                  <h3>Dwayne Johnson</h3>
                  <img src={verified} alt='verified' />
                </div>
                <p>@dwayne</p>
              </div>
              <div className='follow-button'>
                <button>Follow</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Homepage