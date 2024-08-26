import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/sideBar.css';

import { FaPaperPlane } from "react-icons/fa6";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoCallOutline } from "react-icons/io5";
import { TbMessageDots } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

import avatar from '../assets/google.png';
const SideBar = ({user,setUser,contact,activeItem, setActiveItem}) => {
  const navigate=useNavigate();

  const logOut=()=>{
    contact.map((who)=>{
      localStorage.removeItem(`messages_${who._id}`);
    })
    localStorage.removeItem('user');
    setUser(null);
    return;
  }
  return (
    <div id='sideBar'>
      <div id='sidebar-logo'>
        <FaPaperPlane id='sidebar-logo-paperplane' />
        <p>ChatBox</p>
      </div>
      <div id='sidebar-icons'>
        <div
          className={`sidebar-icons-divs ${activeItem === "Dashboard" ? "active" : ""}`}
          onClick={() => setActiveItem("Dashboard")}
        >
          <TbLayoutDashboard className='sidebar-icons-divs-icon' />
          Dashboard
        </div>
        <div
          className={`sidebar-icons-divs ${activeItem === "Calls" ? "active" : ""}`}
          onClick={() => setActiveItem("Calls")}
        >
          <IoCallOutline className='sidebar-icons-divs-icon' />
          Calls
        </div>
        <div
          className={`sidebar-icons-divs ${activeItem === "Messages" ? "active" : ""}`}
          onClick={() => setActiveItem("Messages")}
        >
          <TbMessageDots className='sidebar-icons-divs-icon' />
          Messages
        </div>

        <div
          className={`sidebar-icons-divs ${activeItem === "Notification" ? "active" : ""}`}
          onClick={() => setActiveItem("Notification")}
        >
          <IoMdNotificationsOutline className='sidebar-icons-divs-icon' />
          Notification
        </div>
        <div
          className={`sidebar-icons-divs ${activeItem === "Settings" ? "active" : ""}`}
          onClick={() => setActiveItem("Settings")}
        >
          <IoSettingsOutline className='sidebar-icons-divs-icon' />
          Settings
        </div>



      </div>
      <div className='sidebar-footer'>
        <img className='profile-picture' src={avatar}></img>
        <div id='profile-info'>
          <span id='profile-name'>{user.firstName}</span>
          <p id='logout-text' onClick={()=>logOut()}>Log out</p>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
