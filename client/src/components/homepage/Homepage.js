import React from 'react';
import './homepage.css';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiHome, CiUser, CiSettings } from 'react-icons/ci';
import { CgLivePhoto } from 'react-icons/cg';
import { PiMessengerLogoThin } from 'react-icons/pi';
import { GoComment } from 'react-icons/go';
import { FcLikePlaceholder } from 'react-icons/fc'
import { CiShare2 } from 'react-icons/ci';
import verified from '../../assets/verified.png';
import man1 from '../../assets/man1.jpg';
import woman4 from '../../assets/woman3.jpg';
import wrestling from '../../assets/wrestling.jpg';
// import { FaArrowDown } from 'react-icons/fa';

const Homepage = () => {
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
            <li><CiHome size={20} color='light gray' /> <span>Home</span></li>
            <li><PiMessengerLogoThin size={20} color='light gray' /> <span>Messages</span></li>
            <li><CgLivePhoto size={20} color='light gray' /> <span>Go Live</span></li>
            <li><IoMdNotificationsOutline size={20} color='light gray' /> <span>Notifications</span></li>
            <li><CiUser size={20} color='light gray' /> <span>Profile</span></li>
            <li><CiSettings size={20} color='light gray' /> <span>Settings</span></li>
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
              <img src={woman4} alt='man' />
              <p>Backbenchers community</p>
            </div>
          </div>
        </div>
        <div className='feeds-container'>
          <div className='stories'>
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
              <img src={man1} alt='man' />
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
              <img src={man1} alt='man' />
            </div>
            <div className='story'>
              <img src={man1} alt='man' />
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