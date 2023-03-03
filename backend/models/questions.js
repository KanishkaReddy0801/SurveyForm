const mongoose = require("mongoose"); //call package

const questionSchema = new mongoose.Schema(
  {
      "question": {
        "type": "string",
        "required": true
      },
      "options": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "type": {
        "type": "string",
        "enum": ["Multiple-Choice", "Single-Choice"],
        "required": true
      }
  }
);
module.exports = mongoose.model("question", questionSchema);