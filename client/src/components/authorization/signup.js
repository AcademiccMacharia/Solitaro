import React, { useState, useEffect } from 'react';
import './login.css';
import './signup.css'
import landingLogo from '../../assets/login-logo.png';
import connect from '../../assets/connecting.svg';
import interact from '../../assets/conversations.svg';
import loving from '../../assets/selfie.png';
import { FaArrowRight, FaGoogle} from 'react-icons/fa';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ProgressBar from './ProgressBar';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [full_name, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplayActive, setAutoplayActive] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const navigate = useNavigate();

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


  // let getCountry = async () => {
  //   try {
  //     const response = await fetch('https://restcountries.com/v3.1/all');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch country data');
  //     }
  //     const data = await response.json();
  //     setCountry(data);
  //   } catch (error) {
  //     console.error('Error fetching countries:', error);
  //   }
  // };


  useEffect(() => {
    let interval;

    if (autoplayActive) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slideData.length);
      }, 4000);
    }
    // getCountry();
    return () => clearInterval(interval);

  }, [autoplayActive, slideData.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setAutoplayActive(true)
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ full_name, username, email, password, dob, gender, country })
      });
      console.log(response)

      if (response.ok) {
        navigate('/login')
        alert("Registration successful!")
      } else {
        const errorData = await response.json();
        alert('Registration failed. Please try again.')
        console.log('Register error:', errorData);
      }
    } catch (error) {
      console.error('Register error:', error);
    }
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
      <div className='signup-right'>
      {isLoading ? <ProgressBar percentage={loadingProgress} /> : ''}
        <div className='signup-header'>
          <h1>Create An Account</h1>
          <p>Sign Up and start your journey with us.</p>
        </div>
        <div className='signup-form'>
          <form onSubmit={handleSignUp}>
          <div className='form-left'>
            <div className='input-group'>
              <label htmlFor="fullname">Full Name:</label>
                <input
                  type='text'
                  id='fullname'
                  placeholder='Full Name'
                  value={full_name}
                  onChange={(e) => setFullName(e.target.value)}
                ></input>
              </div>
              <div className='input-group'>
                <label htmlFor="username">Username:</label>
                <input
                  type='text'
                  id='username'
                  placeholder='Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className='input-group'>
                <label htmlFor="email">Email:</label>
                <input
                  type='email'
                  id='email'
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className='input-group'>
                <label htmlFor="password">Password:</label>
                <div className='password-input-wrapper'>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  placeholder='Password'
                  id='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <span onClick={togglePasswordVisibility}>
                  {passwordVisible ? <RiEyeFill size={24} /> : <RiEyeOffFill size={20} />}
                </span>
              </div>
            </div>
            </div>
            <div className='form-right'>
              <div className='input-group'>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type='date'
                  id='dob'
                  placeholder='Date of Birth'
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                ></input>
              </div>
              <div className='input-group'>
                <label htmlFor='gender'>Gender:</label>
                <select
                  type='text'
                  id="gender"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled value=''>Select Gender</option>
                  <option value={"Male"}>{`Male`}  </option>
                  <option value={"Female"}>{`Female`}   </option>
                  <option value={"Non-binary"}>{`Non-binary`}   </option>
                  <option value={"Prefer not to say"}>{`Prefer not to say`}   </option>
                  <option value={"Other"}>{`Other`}   </option>
                </select>
              </div>
              <div className='input-group'>
                <label htmlFor='country'>Country:</label>
                <select
                  type='text'
                  id="country"
                  name="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option disabled value=''>Select Country</option>
                  <option value={"Kenya"}>{`Kenya`}  </option>
                  <option value={"Uganda"}>{`Uganda`}   </option>
                  <option value={"Tanzania"}>{`Tanzania`}   </option>
                  {/* {country.map((country) => (
                    <option key={country.name.common} value={country.name.common}>{`${country.name.common}`}</option>
                  ))} */}
                </select>
              </div>
              </div>
              <div className='input-group' id='submit-btn'>
                <button type='submit'><FaArrowRight /></button>   
            </div>
          </form>

        </div>
        <div className='right-bottom'>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
          <div className='line-container'>
            <hr className='line'></hr>
            <span className='or'>or</span>
            <hr className='line'></hr>
          </div>
          <div className='social-login'>
            <button className='social-btn'>
              <i className='fab fa-google'>
                {' '}
                <FaGoogle />
              </i>
              <span>Continue with Google</span>
            </button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Signup