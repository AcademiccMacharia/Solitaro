import React, { useState, useEffect } from 'react';
import './login.css';
import landingLogo from '../../assets/login-logo.png';
import connect from '../../assets/connecting.svg';
import interact from '../../assets/conversations.svg';
import loving from '../../assets/selfie.png';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const slideData = [
    {
      image: connect,
      caption: 'Connect with like-minded individuals, fostering meaningful relationships in a thriving social community',
    },
    {
      image: interact,
      caption: 'Interact, engage, and spark conversations with diverse voices',
    },
    {
      image: loving,
      caption: 'Embark on an exciting journey where laughter and enjoyment are the heartbeat of your social media experience',
    },
  ];

  useEffect(() => {
    let interval;

    if (autoplayActive) {
        interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slideData.length);
        }, 3000);
    }

    return () => clearInterval(interval);
}, [autoplayActive, slideData.length]);

const handleDotClick = (index) => {
    setCurrentSlide(index);
    setAutoplayActive(true)
};

useEffect(() => {
  let interval;

  if (isLoading) {
    setLoadingProgress(0);
    interval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        const newProgress = prevProgress + 5;
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 500);
  }

  return () => clearInterval(interval);
}, [isLoading]);

const handleLogin = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const response = await axios.post('http://localhost:5000/login', {
      email,
      password
    }, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log(response);

    if (response.status === 200) {
      const sessionResponse = response.data;
      console.log(sessionResponse);

      if (sessionResponse.success === true) {
        navigate('/home');
      } else {
        setMessage('Login failed. Please try again.');
      }
    } else {
      const errorData = response.data;
      setMessage('Login failed. Please try again.');
      console.log('Login error:', errorData.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    setMessage('Login failed. Please try again.');
  }
};  
 

  return (
    <div className='login-page'>
      <div className='login-left'>
        <img src={landingLogo} className='my-logo' alt='mylogo' />
        <div className='image-slider'>
          {slideData.map((slide, index) => (
            <div className={`slide ${index === currentSlide ? 'active' : ''}`} key={index}>
              <img src={slide.image} alt='slide' />
              <div className='slide-info'>
                <p>{slide.caption}</p>
              </div>
            </div>
          ))}
          <div className='navigation'>
            {slideData.map((_, index) => (
              <div
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                key={index}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className='left-bottom'>
          <p>&copy; 2023 Solitaro. All rights reserved.</p>
        </div>
      </div>
      <div className='login-right'>
      {isLoading ? <ProgressBar percentage={loadingProgress} /> : ''}
        <div className='login-header'>
          <h1>Hello Again!</h1>
          <p>Login and continue your journey with us</p>
        </div>
        <div className='login-form'>
          <form onSubmit={handleLogin}>
            <div className='form-group'>
              <label htmlFor='email'>Email:</label>
              <br />
              <input
                type='email'
                name='email'
                placeholder='Enter your email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span></span>
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password:</label>
              <br />
              <div className='password-input-wrapper'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name='password'
                  placeholder='Enter your password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className='eye-icon' onClick={togglePasswordVisibility}>
                  {passwordVisible ? <RiEyeFill size={24} /> : <RiEyeOffFill size={20} />}
                </i>
              </div>
            </div>
            <div className='form-group'>
              <button type='submit'>
              Sign In
              </button>
            </div>
            <div className='form-group'>
              <p>
                Don't have an account? <a href='/signup'>Sign up</a>
              </p>
            </div>
          </form>
        </div>
        <div className='right-bottom'>
          <div className='line-container'>
            <hr className='line'></hr>
            <span className='or'>or</span>
            <hr className='line'></hr>
          </div>
          <div className='social-login'>
            <button className='social-btn'>
              <i className='fab fa-facebook-f'>
                {' '}
                <FaFacebook />{' '}
              </i>
              <span>Continue with Facebook</span>
            </button>
            <button className='social-btn'>
              <i className='fab fa-google'>
                {' '}
                <FaGoogle />
              </i>
              <span>Continue with Google</span>
            </button>
            <button className='social-btn'>
              <i className='fab fa-twitter'>
                {' '}
                <FaTwitter />{' '}
              </i>
              <span>Continue with Twitter</span>
            </button>
          </div>
          {message && <p className="login-message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;