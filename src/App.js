import {BrowserRouter , Routes ,Route} from 'react-router-dom';
import Login from './components/login/login';
import Preview from './components/preview/preview';
import Profile from './components/profile/profile';
import Register from './components/register/register';
import CreateQuestions from './components/survey/createquestion';
import CreateSurvey from './components/survey/createsurvey';
import SurveyList from './components/survey/surveylist';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/survey' element={<SurveyList/>} />
        <Route path='/createsurvey' element={<CreateSurvey/>} />
        <Route path='/createquestions' element={<CreateQuestions/>} />
        <Route path='/preview' element={<Preview/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
