const express = require("express");
const router = express.Router();
const Question = require("../models/questions");

router.get("/createqstns", (req, res) => {
  Question.find({}, (err,data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
      res.json({
        status: "ok",
        message: "questions stored successfully",
        data:data
      })
    }
  });
  
});

router.post("/createqstns", async (req, res) => {
  console.log(req.body);
  try {
    // Create a new Question instance from the request body
    // Create a new question in the database
    Question.create(req.body, (err, savedQuestion) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to save question' });
      } else {
        console.log(`Question saved: ${savedQuestion}`);
        res.status(201).json({
          status: "ok",
          message: "Question saved successfully",
          data: savedQuestion
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.patch("/updateqstns", async (req, res) => {
  try {
    const { id, options } = req.body;

    const data = await Question.findOneAndUpdate(
      { _id: id },
      { $set: { options: options } },
      { new: true }
    );

    res.json({
      status: "success",
      message: "Questions with options updated successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.get("/getqstns", async (req, res) => {
  try {
    const data = await Question.find({});
    res.json({
      status: "success",
      message: "Questions fetched successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;