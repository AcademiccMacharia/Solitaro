import React, { useState, useRef } from 'react';
import './homepage.css';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import { GoComment } from 'react-icons/go';
import { FcLikePlaceholder } from 'react-icons/fc'
import { CiShare2 } from 'react-icons/ci';
import verified from '../../assets/verified.png';
import videoBg from '../../assets/videoBg.mp4'
import vid from '../../assets/vid.mp4'
import marcus from '../../assets/man4.jpg';
import car from '../../assets/car2.jpg'
import man1 from '../../assets/man1.jpg';
import man2 from '../../assets/man2.jpg';
import woman1 from '../../assets/woman1.jpg';
import woman4 from '../../assets/woman3.jpg';
import wrestling from '../../assets/wrestling.jpg';
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
// import { FaArrowDown } from 'react-icons/fa';

const Homepage = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  }

  const handleSoundToggle = () => {
    setIsMuted(!isMuted);
  };

  const handlePlayPause = (videoRef) => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoLoaded = (videoRef) => {
    if (!isPlaying) {
      videoRef.current.pause();
    }
  };


  return (
    <div className='homepage'>
      <div className='homepage-container'>
        <div className='profile-container'>
          <div className='profile-info'>
            <div className='profile-image'>
              <img src={man1} alt='man' />
            </div>
            <div className='username'>
              <div className='verification'>
                <h3>Dwayne Johnson</h3>
                <img src={verified} alt='verified' />
              </div>
              <p>@dwayne</p>
            </div>
          </div>
          <div className='profile-stats'>
            <div className='profile-stat'>
              <p>Posts</p>
              <p>20</p>
            </div>
            <div className='profile-stat'>
              <p>Followers</p>
              <p>100</p>
            </div>
            <div className='profile-stat'>
              <p>Following</p>
              <p>500</p>
            </div>
          </div>
        </div>
        <div className='links-container'>
          <ul>
            <li
              className={activeLink === 'Home' ? 'active' : ''}
              onClick={() => handleLinkClick('Home')}
            >
              <CiHome size={20} color={activeLink === 'Home' ? 'gold' : 'lightgray'} /> <span>Home</span>
            </li>
            <li
              className={activeLink === 'Messages' ? 'active' : ''}
              onClick={() => handleLinkClick('Messages')}
            >
              <PiMessengerLogoThin size={20} color={activeLink === 'Messages' ? 'gold' : 'lightgray'} /> <span>Messages</span>
            </li>
            <li
              className={activeLink === 'Go Live' ? 'active' : ''}
              onClick={() => handleLinkClick('Go Live')}
            >
              <CgLivePhoto size={20} color={activeLink === 'Go Live' ? 'gold' : 'lightgray'} /> <span>Go Live</span>
            </li>
            <li
              className={activeLink === 'Notifications' ? 'active' : ''}
              onClick={() => handleLinkClick('Notifications')}
            >
              <IoMdNotificationsOutline size={20} color={activeLink === 'Notifications' ? 'gold' : 'lightgray'} /> <span>Notifications</span>
            </li>
            <li
              className={activeLink === 'Profile' ? 'active' : ''}
              onClick={() => handleLinkClick('Profile')}
            >
              <CiUser size={20} color={activeLink === 'Profile' ? 'gold' : 'lightgray'} /> <span>Profile</span>
            </li>
            <li
              className={activeLink === 'Settings' ? 'active' : ''}
              onClick={() => handleLinkClick('Settings')}
            >
              <CiSettings size={20} color={activeLink === 'Settings' ? 'gold' : 'lightgray'} /> <span>Settings</span>
            </li>
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
                <img src={man1} alt='man' />
              </div>
              <div className='post-input'>
                <input type='text' placeholder='What is on your mind?' />
              </div>
              <div className='post-button'>
                <button>Post It!</button>
              </div>
            </div>
            <div className='upload-button'>
              <button>Photo</button>
              <button>Video</button>
            </div>
          </div>
          <div className='post-container'>
            <div className='post-header'>
              <div className='profile-image'>
                <img src={marcus} alt='man' />
              </div>
              <div className='post-info'>
                <div className='post-info-top'>
                  <h3>Marcus Rashford</h3>
                  <p>@m_arcus</p>
                </div>
                {/* <div className='post-info-bottom'>
                  <p>2h</p>
                  <p>Public</p>
                  <p>...</p>
                </div> */}
              </div>
            </div>
            <div className='post-content'>
              <p>
                I am a footballer who currently plays as a forward for Premier League club Manchester United and the England national team. I have been playing for Manchester United since the age of seven. I have been playing for Manchester United since the age of seven.
              </p>
              <img src={car} alt='post1' />
            </div>
            <div className='post-stats'>
              <div className='post-stat'>
                <FcLikePlaceholder size={20} />
                <p>20</p>
              </div>
              <div className='post-stat'>
                <GoComment size={20} />
                <p>100</p>
              </div>
              <div className='post-stat'>
                <CiShare2 size={20} />
                <p>500</p>
              </div>
            </div>
          </div>
          <div className='post-container'>
            <div className='post-header'>
              <div className='profile-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='post-info'>
                <div className='post-info-top'>
                  <h3>Dwayne Johnson</h3>
                  <p>@dwayne</p>
                </div>
                {/* <div className='post-info-bottom'>
                  <p>2h</p>
                  <p>Public</p>
                  <p>...</p>
                </div> */}
              </div>
            </div>
            <div className='post-content'>
              <p>Hey guys, I am Dwayne Johnson. I am a professional wrestler and an actor. I am also known as The Rock. I am here to share my experience with you all. I hope you all will like it.</p>
              <div
                className="video-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <video
                  src={videoBg}
                  loop
                  muted={isMuted}
                  ref={videoRef1}
                  onLoadedData={() => handleVideoLoaded(videoRef1)}
                />
                {isHovered && (
                  <div className="video-overlay">
                    {isPlaying ? (
                      <FaPause
                        className="play-pause-icon"
                        onClick={() => handlePlayPause(videoRef1)}
                      />
                    ) : (
                      <FaPlay
                        className="play-pause-icon"
                        onClick={() => handlePlayPause(videoRef1)}
                      />
                    )}
                  </div>
                )}
                <div className="mute-button">
                  {isMuted ? (
                    <FaVolumeMute
                      className="volume-icon"
                      onClick={handleSoundToggle}
                    />
                  ) : (
                    <FaVolumeUp
                      className="volume-icon"
                      onClick={handleSoundToggle}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='post-stats'>
              <div className='post-stat'>
                <FcLikePlaceholder size={20} />
                <p>20</p>
              </div>
              <div className='post-stat'>
                <GoComment size={20} />
                <p>100</p>
              </div>
              <div className='post-stat'>
                <CiShare2 size={20} />
                <p>500</p>
              </div>
            </div>
          </div>
          <div className='post-container'>
            <div className='post-header'>
              <div className='profile-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='post-info'>
                <div className='post-info-top'>
                  <h3>Dwayne Johnson</h3>
                  <p>@dwayne</p>
                </div>
                {/* <div className='post-info-bottom'>
                  <p>2h</p>
                  <p>Public</p>
                  <p>...</p>
                </div> */}
              </div>
            </div>
            <div className='post-content'>
              <p>Hey guys, I am Dwayne Johnson. I am a professional wrestler and an actor. I am also known as The Rock. I am here to share my experience with you all. I hope you all will like it.</p>
              <div
                className="video-wrapper"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <video
                  src={vid}
                  loop
                  muted={isMuted}
                  ref={videoRef2}
                  onLoadedData={() => handleVideoLoaded(videoRef2)}
                />
                {isHovered && (
                  <div className="video-overlay">
                    {isPlaying ? (
                      <FaPause
                        className="play-pause-icon"
                        onClick={() => handlePlayPause(videoRef2)}
                      />
                    ) : (
                      <FaPlay
                        className="play-pause-icon"
                        onClick={() => handlePlayPause(videoRef2)}
                      />
                    )}
                  </div>
                )}
                <div className="mute-button">
                  {isMuted ? (
                    <FaVolumeMute
                      className="volume-icon"
                      onClick={handleSoundToggle}
                    />
                  ) : (
                    <FaVolumeUp
                      className="volume-icon"
                      onClick={handleSoundToggle}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className='post-stats'>
              <div className='post-stat'>
                <FcLikePlaceholder size={20} />
                <p>20</p>
              </div>
              <div className='post-stat'>
                <GoComment size={20} />
                <p>100</p>
              </div>
              <div className='post-stat'>
                <CiShare2 size={20} />
                <p>500</p>
              </div>
            </div>
          </div>
          <div className='post-container'>
            <div className='post-header'>
              <div className='profile-image'>
                <img src={man1} alt='man' />
              </div>
              <div className='post-info'>
                <div className='post-info-top'>
                  <h3>Dwayne Johnson</h3>
                  <p>@dwayne</p>
                </div>
                {/* <div className='post-info-bottom'>
                  <p>2h</p>
                  <p>Public</p>
                  <p>...</p>
                </div> */}
              </div>
            </div>
            <div className='post-content'>
              <p>Hey guys, I am Dwayne Johnson. I am a professional wrestler and an actor. I am also known as The Rock. I am here to share my experience with you all. I hope you all will like it.</p>
              <img src={wrestling} alt='post1' />
            </div>
            <div className='post-stats'>
              <div className='post-stat'>
                <FcLikePlaceholder size={20} />
                <p>20</p>
              </div>
              <div className='post-stat'>
                <GoComment size={20} />
                <p>100</p>
              </div>
              <div className='post-stat'>
                <CiShare2 size={20} />
                <p>500</p>
              </div>
            </div>
          </div>
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
    </div>
  )
}

export default Homepage