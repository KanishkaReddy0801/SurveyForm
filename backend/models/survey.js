const mongoose = require("mongoose"); //call package

const surveySchema = new mongoose.Schema(
  {
    "fname": String,           
    "startdate": String,       
    "enddate": String,         
    "description": String,     
    "criteria": String,        
    "surveytype": String,      
  }
);
module.exports = mongoose.model("survey", surveySchema);