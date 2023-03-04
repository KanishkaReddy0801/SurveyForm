import React, { useRef, useState } from "react"
import './createsurvey.css'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import axios from 'axios';
import BASE_URL from '../../helper'

function CreateSurvey () {
    const [filename, setFileName] = useState("");
    const [upload, setUpload] = useState(null);
    const fname = useRef()
    const startdate = useRef()
    const enddate = useRef()
    const description = useRef()
    const criteria = useRef()
    const surveytype = useRef()

    const handlechange = e => {
        console.log(e.target.value)
        setUpload(e.target.files[0])
        setFileName(e.target.files[0].name)
    }

    const logout = () => {
        window.location.href = '/'
    }
    const cancel = () => {
        window.location.href = '/survey'
    }
    const home = () => {
        window.location.href = '/survey'
    }
    const profile = () => {
        window.location.href = '/profile'
    }
    const createSurvey = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fname', fname.current.value);
        formData.append('startdate', startdate.current.value);
        formData.append('enddate', enddate.current.value);
        formData.append('description', description.current.value);
        formData.append('criteria', criteria.current.value);
        formData.append('surveytype', surveytype.current.value);
        formData.append('upload', upload);
      
        try {
            const res = await axios.post(`${BASE_URL}/createsurvey`, formData, {
                headers: {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            console.log(res.data)
            window.location.href = '/createquestions'
        } catch (err) {
            console.log(err)
        }
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
        <header className="createhead">
            <h1>Create Survey</h1>
            <div>
            <button onClick={cancel} className="cancelbtn">Cancel</button>
            <button disabled={!fname || !startdate || !enddate || !description || !criteria || !surveytype || !upload} onClick={createSurvey} className="nextbtn">Next</button>
            </div>
        </header>
        <main>
            <form action="/createsurvey" >
            <div className="main1">
            <div>
                <h2>Name</h2>
                <input ref={fname} id="namein" type="text" placeholder="Name here"/>
            </div>
            <div>
                <h2>Start Date</h2>
                <input ref={startdate} id="datein" type="date" />
            </div>
            <div>
                <h2>End Date</h2>
                <input ref={enddate} id="datein" type="date" />
            </div>
            </div>
            <div className="main2">
            <div>
                <h2>Description</h2>
                <input ref={description} id="descin" type="text" placeholder="Description"/>
            </div>
            <div>
                <h2>Other Criteria</h2>
                <input ref={criteria} id="critin" type="text" placeholder="Enter Here"/>
            </div>
            </div>
            <div className="main3">
            <div>
                <h2>Type of Survey</h2>
                <select name="Select" id="surveyselect" ref={surveytype}>
                    <option value="option1">select</option>
                    <option value="option2">Educational</option>
                    <option value="option3">Personal</option>
                    <option value="option4">Professional</option>
                </select>
            </div>
            <div>
                <h2>Upload Image</h2>
                <label id="uploadlabel" htmlFor="upload">
                    Drag and drop to Upload
                    <input type="file" id="upload" onChange={handlechange}/>
                </label>
            </div>
            </div>
            </form>
        </main>
        </div>
    )
}

export default CreateSurvey