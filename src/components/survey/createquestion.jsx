import React, { useState } from "react";
import './createquestion.css'
//import axios from 'axios'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

const CreateQuestions = () => {
    const [options, setOptions] = useState("")
    const [type, setType] = useState("")
    const [question, setQuestion] = useState("")
    const [questions, setQuestions] = useState([{ question: ""}])
    const addQuestion = () => {
        setQuestions([...questions, {question: ""}])
    }
    const logout = () => {
        window.location.href = '/'
    }
    const back = () => {
        window.location.href = '/createsurvey'
    }
    const preview = () => {
        window.location.href = '/preview'
    }
    const home = () => {
        window.location.href = '/survey'
    }
    const profile = () => {
        window.location.href = '/profile'
    }
    const savequestions = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/createqstns", questions, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                },
                body: JSON.stringify({
                    questions,
                    options,
                    type,
                })
            });
            const data = await response.json();
            if(data.status === 'ok') {
                window.location.href = '/survey'
            }
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
        <header className="createqhead">
            <div className="queshead">
            <FaLongArrowAltLeft onClick={back} className="back"/>
            <h1>Create Questions</h1>
            </div>
            <div>
            <button disabled={!question} className="previewbtn" onClick={preview}>Preview</button>
            <button disabled={!question[0]} className="savebtn" onClick={savequestions}>Save</button>
            </div>
        </header>
        <main>
            {questions.map((question, index) => (
                <div key={index} className="main">
                    <h1>Q{index+1}</h1>
                    <div>
                        <h2>Question</h2>
                        <input value={question.question} onChange={(event) => {
                            const newQuestions = [...questions];
                            newQuestions[index].question = event.target.value;
                            setQuestion(newQuestions) }} 
                            id="quein" type="text" placeholder="Enter Question"/>
                        <div id="radio">
                            <div id="val">
                                <input onChange={(e) => setOptions(e.target.value)} type="radio" value={"value"} /> value
                            </div>
                             <div id="val">
                                <input onChange={(e) => setOptions(e.target.value)} type="radio" value={"value"} /> value 
                            </div>
                            <div id="val">
                                <input onChange={(e) => setOptions(e.target.value)} type="radio" value={"value"} /> value
                            </div>
                        </div>
                    </div>
                    <FaCog className="settings" />
                    <div id="quetype">
                        <FaTimes className="close"/>
                        <h6>Question Type</h6>
                        <select className="selectque">
                            <option onChange={(e) => setType(e.target.value)} value="Multiple-Choice">Multiple Choice</option>
                            <option onChange={(e) => setType(e.target.value)} value="Single-Choice">Single Choice</option>
                        </select>
                    </div>
                </div>
                ))}
            
        </main>
        <button onClick={addQuestion} id="addque">Add Question</button>
        </div>
    )
}

export default CreateQuestions