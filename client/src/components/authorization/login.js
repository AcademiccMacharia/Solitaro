import React, { useState, useEffect } from 'react';
import './auth.css';
import landingLogo from '../../assets/login-logo.png';
import connect from '../../assets/connecting.svg';
import interact from '../../assets/conversations.svg';
import loving from '../../assets/loving.svg';

const Login = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);

  const slideData = [
    {
      image: connect,
      caption: "Connect with like-minded individuals, fostering meaningful relationships in a thriving social community",
    },
    {
      image: interact,
      caption: "Interact, engage, and spark conversations with diverse voices",
    },
    {
      image: loving,
      caption: "Embark on an exciting journey where laughter and enjoyment are the heartbeat of your social media experience",
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
    setAutoplayActive(false);
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
        <div>
          <button>Sign In</button> <button>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
