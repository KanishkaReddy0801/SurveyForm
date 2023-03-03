const express = require("express");
const app = express();
const userRoute=require("./routes/user");
const authRoute=require("./routes/auth");
const registrationRoute = require('./routes/registration')
const loginRoute = require('./routes/login'); 
const survey = require('./routes/survey'); 
const fs = require("fs")

const questions = require('./routes/questions'); 

const getsurvey =require('./routes/getsurvey');

const cors = require("cors");

const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.filename + '-' + Date.now())
    }
})

var upload = multer({ dest: 'upload' })


//--------------------------------------
//connection with mongoDB
const mongoose = require("mongoose");
const dotenv=require("dotenv");//call the library
dotenv.config();//

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb://localhost:27017/surveyform`,(err) => {
    if(err) {
        console.log(`${err} error connecting to mongodb`);
    }else {
        console.log("Succesfully connected to the database");
    }
});

app.use(express.json())//to test data while api to work


app.use(cors());
app.use(express.json());

//authtication call
app.use("/api/auth", authRoute);
//user call
app.use("/api/users", userRoute);

//another method
app.use('/api', registrationRoute);
app.use('/api', loginRoute)

//create survey
app.use('/api', survey)

app.use('/api', questions)


//get survey
app.use('/api', getsurvey)


app.listen(process.env.PORT || 8080, () => {
    console.log("Backend server is running on 8080!");
  })