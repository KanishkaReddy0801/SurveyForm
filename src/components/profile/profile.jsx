import React, { useState } from "react"
import './profile.css'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";

const Profile = () => {
    const logout = () => {
        window.location.href = '/'
    }
    const home = () => {
        window.location.href = '/survey'
    }
    return (
        <div>
            <nav className='navbar'>
            <p onClick={home} className='logo'>LOGO</p>
            <button className='logout' onClick={logout}>LogOut</button>
        </nav>
        <nav className='sidebar'>
           <div className='homediv'> <AiFillHome className='home'/> </div>
           <div className='groupdiv'> <AiOutlineTeam className='group'/> </div>
           <div className='taskdiv'> <FaList className='task'/> </div>
        </nav>
        <main>
            
        </main>
        </div>
    )
}

export default Profile