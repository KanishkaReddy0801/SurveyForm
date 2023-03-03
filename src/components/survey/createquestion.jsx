import React, { useState } from "react";
import './createquestion.css'
//import axios from 'axios'
import { AiFillHome } from "react-icons/ai";
import { FaList } from "react-icons/fa";
import { AiOutlineTeam  } from "react-icons/ai";
import { FaLongArrowAltLeft } from "react-icons/fa";

const QuestionForm = () => {
    const [questions, setQuestions] = useState([
      { text: "", options: ["", "", ""], answerIndex: null }
    ]);
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
    const handleQuestionChange = (event, questionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].text = event.target.value;
        setQuestions(updatedQuestions);
      };
    
      const handleOptionChange = (event, questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
        setQuestions(updatedQuestions);
      };
    
      const handleAnswerChange = (event, questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].answerIndex = optionIndex;
        setQuestions(updatedQuestions);
      };
    
      const handleAddQuestion = () => {
        setQuestions([
          ...questions,
          { text: "", options: ["", "", ""], answerIndex: null }
        ]);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted with questions: ", questions);
        fetch('http://localhost:8080/api/createqstns', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(questions)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
      };
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
            <button disabled={!questions} className="previewbtn" onClick={preview}>Preview</button>
            <button disabled={!questions[0]} className="savebtn">Save</button>
            </div>
        </header>
        <main>
            <form className="main" onSubmit={handleSubmit}>
                {questions.map((question, index) => (
                    <div key={index}>
                        <div className="quediv">
                        <h1>Q {index+1}</h1>
                        <label className="quein">
                            Question:
                                <input
                                type="text"
                                value={question.text}
                                onChange={(event) => handleQuestionChange(event, index)}/>
                        </label>
                        </div>
                        <br />
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex}>
                                <label className="radio">
                                    <input
                                    type="radio"
                                    name={`correct-answer-${index}`}
                                    value={optionIndex}
                                    checked={question.answerIndex === optionIndex}
                                    onChange={(event) =>
                                    handleAnswerChange(event, index, optionIndex)}/>
                                </label>
                                <label className="option">
                                    {optionIndex + 1}
                                        <input
                                        type="text"
                                        value={option}
                                        placeholder='value'
                                        onChange={(event) =>
                                        handleOptionChange(event, index, optionIndex)}/>
                                </label>
                                
                            </div>
                        ))}
                    </div>
                ))}
                <br />
                <button className="sub" type="submit">Submit</button>
            </form>
        </main>
        <button onClick={handleAddQuestion} id="addque">Add Question</button>
        </div>
    )
}

export default QuestionForm