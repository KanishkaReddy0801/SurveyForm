import React, { useEffect, useState } from 'react'
import './surveylist.css'
import { AiFillFilter } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import BASE_URL from '../../helper';
const SurveyList = () => {
    const [surveys, setSurveys] = useState([]);
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
    const onDeleteSurvey = (surveyId) => {
        fetch(`${BASE_URL}/deletesurvey/${surveyId}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            const updatedSurveys = surveys.filter((survey) => survey._id !== surveyId);
            setSurveys(updatedSurveys);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      
      
    useEffect(() => {
        fetch(`${BASE_URL}/getallsurvey`)
        .then(res => res.json())
        .then(data => {
            setSurveys(data.info)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])
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
            {surveys.map(survey => (
                <div className='survey' key={survey._id}>
                    <p>{survey.fname}</p>
                    <p>{survey.description}</p>
                    <p>{survey.surveytype}</p>
                    <p>{survey.startdate}</p>
                    <p>{survey.enddate}</p>
                    <div className='action'>
                        <MdEdit className='edit'/>
                        <RiDeleteBin6Line onClick={() => onDeleteSurvey(survey._id)} className='delete'/>
                    </div>
                </div>
            ))}
        </main>
        </div>
    )
}

export default SurveyList;