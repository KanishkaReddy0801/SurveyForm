const mongoose = require("mongoose"); //call package

const questionSchema = new mongoose.Schema({
  text: {
    type: String, required: true 
  },
  options: [{ 
    type: String,
    required: true 
  }],
  answerIndex: { 
    type: Number, required: true 
  },
});

module.exports = mongoose.model("question", questionSchema);