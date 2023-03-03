import React from 'react'
import './surveylist.css'
import { AiFillFilter } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
const SurveyList = () => {
    const create = () => {
        window.location.href = '/createsurvey'
    }
    const logout = () => {
        window.location.href = '/'
    }
    const home = () => {
        window.location.href = '/survey'
    }
    const profile = () => {
        window.location.href = '/profile'
    }
    return (
        <div>
        <nav className='navbar'>
            <p onClick={home} className='logo'>LOGO</p>
            <div onClick={profile} className='userprofile'></div>
            <button className='logout' onClick={logout}>LogOut</button>
        </nav>
        <header className='header'>
            <div className='lefthead'>
            <h2>Survey List</h2>
            <input className='search' placeholder='Search'/>
            </div>
            <div className='righthead'>
            <AiOutlineAlignLeft className='sort'/>
            <AiFillFilter className='filter'/>
            <button className='create' onClick={create}>CREATE</button>
            </div>
        </header>
        <nav className='sidebar'>
           <div className='homediv'> <AiFillHome className='home'/> </div>
           <div className='groupdiv'> <AiOutlineTeam className='group'/> </div>
           <div className='taskdiv'> <FaList className='task'/> </div>
        </nav>
        <main>
            <div className='body'>
                <h3>Name</h3>
                <h3>Description</h3>
                <h3>Type</h3>
                <h3>Start Date</h3>
                <h3>End Date</h3>
                <h3>Actions</h3>
            </div>
        </main>
        </div>
    )
}

export default SurveyList;