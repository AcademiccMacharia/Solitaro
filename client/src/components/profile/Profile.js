// import axios from 'axios'
import React from 'react';
import verified from '../../assets/verified.png';
import man1 from '../../assets/man1.jpg';
import {BsCameraVideo} from 'react-icons/bs';
import { MdOutlineInsertPhoto, MdOutlineAddToPhotos } from 'react-icons/md';
import './profile.css';
import { Link, Outlet } from 'react-router-dom';

const Profile = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   getPosts();
  // }, []);


  // const getPosts = async () => {
  //   try{
  //     const res = await axios.get('http://localhost:5000/profile', {
  //       withCredentials: true,
  //     });
  //     setPosts(res.data);
  //   } catch(error) {
  //     console.error('Error fetching posts:', error.message);
  //   }
  // }



  return (
    <div className='profile'>
      <div className='profile-body'>
        <div className='profile-body-top'>
        <h1>Profile</h1>
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
          <div className='profile-bio'>
            <p>I am a footballer who currently plays as a forward for Premier League club Manchester United and the England national team. I have been playing for Manchester United since the age of seven. I have been playing for Manchester United since the age of seven.</p>
          </div>
          <div className='profile-stats'>
            <div className='profile-stat'>
              <h3>Posts</h3>
              <p>20</p>
            </div>
            <div className='profile-stat'>
              <h3>Followers</h3>
              <p>100</p>
            </div>
            <div className='profile-stat'>
              <h3>Following</h3>
              <p>500</p>
            </div>
          </div>
        </div>
          <div className='profile-body-bottom'>
            <div className='profile-body-content'>
              <div className='profile-nav'>
                <ul>
                  <Link className='link' to='/profile'><li><span><MdOutlineInsertPhoto size={20} /></span>Posts</li></Link>
                  <Link className='link' to='/profile/photos'><li><span><MdOutlineAddToPhotos size={20}/></span>Photos</li></Link>
                  <li><span><BsCameraVideo size={20}/></span>Videos</li>
                </ul>
              </div>
            <Outlet />
              {/* <div className='profile-photos'>
                <div className='profile-photo'>
                  <img src={man1} alt='post' />
                  <img src={wrestling} alt='post' />
                  <img src={marcus} alt='post' />
                  <img src={wrestling} alt='post' />
                  <img src={marcus} alt='post' />
                  <img src={wrestling} alt='post' />
                  <img src={marcus} alt='post' />
                  <img src={wrestling} alt='post' />
                  <img src={marcus} alt='post' />
                  <img src={wrestling} alt='post' />
                  <img src={man1} alt='post' />
                </div>
                </div>
                <div className='profile-videos'>
                <div className='profile-video'>
                  <video src={videoBg} loop/>
                  <video src={videoBg} loop/>
                  <video src={videoBg} loop/>
                  <video src={videoBg} loop/>
                  <video src={videoBg} loop/>
                  <video src={videoBg} loop/>
                </div>
                </div> */}
              </div>
              </div>
          </div>
          </div>
              )
}

              export default Profile