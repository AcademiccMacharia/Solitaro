import React from 'react';
import './landing.css';
import landingLogo from '../../assets/homeLogo-dark.png';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <div className='landing-navbar'>
                <div className='landing-navbar-logo'>
                    <img src={landingLogo} alt='logo' />
                </div>
                <div className='landing-navbar-links'>
                    <ul>
                        <li>Home</li>
                        <li>Discover</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
                <div className='nav-buttons'>
                <Link to='/signup'><button class="custom-btn btn-5"><span>Sign Up</span></button></Link>
                <Link to='/login'><button class="custom-btn btn-5"><span>Sign In</span></button></Link>
                </div>
            </div>
            <div className='landing-page-content'>
                <div className='landing-page-content-text'>
                    <h1>Let's Discover!</h1>
                    <h1>Let's Connect!</h1> 
                    <h1>Let's Flourish!</h1>
                    <p>Join the Vibrant Solitaro Community.</p>
                    <button class="custom-btn btn-12"><span>Click Me!</span><span>Sign Up!</span></button>
                </div>
                <div className='landing-page-content-image'>
                    <img src="https://assets.codepen.io/2621168/svgtest.svg" alt="Phone illustration" />
                </div>
            </div>
        </div>
    )
}

export default LandingPage;