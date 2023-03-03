import React, { useState } from "react"
import './preview.css'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";

const Preview = () => {
    const logout = () => {
        window.location.href = '/'
    }
    const back = () => {
        window.location.href = '/createquestions'
    }
    const close = () => {
        window.location.href = '/createquestions'
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
        <nav className='sidebar'>
           <div className='homediv'> <AiFillHome className='home'/> </div>
           <div className='groupdiv'> <AiOutlineTeam className='group'/> </div>
           <div className='taskdiv'> <FaList className='task'/> </div>
        </nav>
        <header className="createqhead">
            <div className="queshead">
            <FaLongArrowAltLeft onClick={back} className="back"/>
            <h1>Preview</h1>
            </div>
            <div>
            <button className="previewbtn" onClick={close}>Close Preview</button>
            <button className="savebtn">Save</button>
            </div>
        </header>
        <main id="main">
            <div>
                <div className="quehead">
                <h5>Question 1</h5>
                <div className="qline"></div>
                </div>
                <p>Question will be here</p>
                <input type="radio" /> <span>Yes</span>
                <input className="no" type="radio" /> <span>No</span>
            </div>
        </main>
        </div>
    )
}

export default Preview