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

//const cors = require("cors");
//const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

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
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/surveyform`,(err) => {
    if(err) {
        console.log(`${err} error connecting to mongodb`);
    }else {
        console.log("Succesfully connected to the database");
    }
});

app.use(express.json())//to test data while api to work

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });
  
//app.use(cors(corsOptions));
app.use(express.json());

//authtication call
app.use("/api/auth", authRoute);
//user call
app.use("/api/users", userRoute);

//another method
app.use('/api', registrationRoute);
app.use('/api', loginRoute)


app.use('/api', survey)

app.use('/api', questions)


//get survey
app.use('/api', getsurvey)


app.listen(process.env.PORT || 8080, () => {
    console.log("Backend server is running on 8080!");
  })