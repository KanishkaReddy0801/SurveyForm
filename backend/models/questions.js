const mongoose = require("mongoose"); //call package

const questionSchema = new mongoose.Schema({
  text: {
    type: String, required: true 
  },
  options: [{ 
    type: String,
  }],
  answerIndex: { 
    type: Number, required: true 
  },
});

module.exports = mongoose.model("question", questionSchema);