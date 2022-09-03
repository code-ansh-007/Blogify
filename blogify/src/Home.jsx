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
                    <p className='hero-cap'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    <div className='hero-btn'>
                        <NavLink to="/signup" style={{ textDecoration: 'none' }}>
                            <Button className='sign-btn sign-up-btn' variant="contained">Sign Up</Button>
                        </NavLink>
                        <NavLink to="/signin" style={{ textDecoration: 'none' }}>
                            <Button className='sign-btn sign-in-btn' variant="contained">Sign In</Button>
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
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default Home;
