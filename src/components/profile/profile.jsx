import React, { useState, useEffect } from "react"
import './profile.css'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import axios from 'axios'
import BASE_URL from '../../helper'

const Profile = () => {
    const [userData, setUserData] = useState({})
    const logout = () => {
        window.location.href = '/'
    }
    const home = () => {
        window.location.href = '/survey'
    }
    useEffect(() => {
        axios.get(`${BASE_URL}/register`)
        .then(response => {
            console.log(response.data)
            setUserData(response.data.data)
        })
        .catch(error => {
            console.log(error)
        })
    }, [])
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
        <main className="profile">
            <div className="details">
                <span id="name">Name: {userData[0]?.username}</span>
                <span id="profession">Profession: {userData[0]?.profession}</span>
            </div>
            <div className="details">
                <span id="phone">Phone Number: {userData[0]?.phone}</span>
                <span id="mail">Email: {userData[0]?.email}</span>
            </div>
        </main>
        </div>
    )
}

export default Profile