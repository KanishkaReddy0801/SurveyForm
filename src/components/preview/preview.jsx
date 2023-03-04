import React, { useState, useEffect } from "react"
import './preview.css'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";
import BASE_URL from '../../helper'

const Preview = () => {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        fetch(`${BASE_URL}/createqstns`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.status === 'ok') {
                setQuestions(data.data)
                console.log(data.data)
            }
        })
        .catch(err => console.log(err))
    }, [])
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
        {questions.length > 0 && questions.map((data, index) => (
                <div key={index}>
                    <div className="prline">
                    <h3>Question {index+1}</h3>
                    <div className="pline"></div>
                    </div>
                    <h4>{data.text}</h4>
                    <ul>
                        {data.options.map((options, answerIndex) => (
                            <li key={answerIndex}>Option{index+1}: <span>{options}</span></li>
                        ))}
                    </ul>
                </div>
            ))}
        </main>
        </div>
    )
}

export default Preview