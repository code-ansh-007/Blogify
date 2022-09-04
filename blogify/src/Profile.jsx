import React from 'react'
import cover from "./images/out1.jpg"
import dp from "./images/contemplative-reptile.jpg"
import { NavLink } from "react-router-dom";

const Profile = () => {
  return (
    <div className='profile'>
        <div className="cover-img">
          <img src={cover} className= "cover-pic" alt="cover image for the profile" />
        </div>
        <div className='profile-pic'>
          <img src={dp} className = "dp" alt="" />
        </div>
        <div className="details">
          <h3>Ansh Pradhan</h3>
          <p>anshpradhan03@gmail.com</p>
        </div>
        <div className="top-picks">
          <h4>Top picks for today</h4>
          <NavLink to = "/feed" style={{textDecoration: "none"}}><div className='picks'>Top one Post</div></NavLink>
          <br />
          <NavLink to = "/feed" style={{textDecoration: "none"}}><div className='picks'>Top one Post</div></NavLink>
          <br />
          <NavLink to = "/feed" style={{textDecoration: "none"}}><div className='picks'>Top one Post</div></NavLink>
        </div>
    </div>
  )
}

export default Profile