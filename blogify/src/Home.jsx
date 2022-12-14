import React from 'react';
import Logo from './images/Blogify.png';
import { Button } from '@mui/material';
// import FileBase64 from "react-file-base64";
import Footer from './Footer';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div className='tri tri-1'></div>
            <div className='tri tri-2'></div>
            <div className='tri tri-3'></div>
            <div className='tri tri-4'></div>
            <div className='home-page'>
                <div className='hero-sec'>
                    <img className='hero-logo' src={Logo} alt='logo' />
                    <p className='hero-cap'>Blogs, News, People all in one place, Blogify is your one stop destination for all your daily cringe topics </p>
                    <div className='hero-btn'>
                        {/* <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                            <Button className='sign-btn sign-up-btn' variant="contained">Sign Up</Button>
                        </NavLink>
                        <NavLink to="/signin" style={{ textDecoration: 'none' }}>
                            <Button className='sign-btn sign-in-btn' variant="contained">Sign In</Button>
                        </NavLink> */}
                        <NavLink to="/feed" style={{ textDecoration: 'none' }}>
                            <Button className='sign-btn sign-in-btn' variant="contained">Start Blogging</Button>
                        </NavLink>

                        
                    </div>
                    {/* <form action='#'>
                        <FileBase64
                            multiple={false}
                            onDone={({base64}) => setItem({
                                ...item, image: e.target.value
                            })} />
                    </form> */}
                </div>
                <div className='home-abt'>
                    <h2>Why Blogify?</h2>
                    <p>We provide a portal to share blogs and news to the world, find the topic you love, follow the news, and just hang out with people online !!!</p>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home;
