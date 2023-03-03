const express = require("express");
const router = express.Router();
const Question = require("../models/questions");

router.get("/createqstns", (req, res) => {
  res.json({
    status: "ok",
    message: "questions stored successfully"
  })
});

router.post("/createqstns", async (req, res) => {
  try {
    const { question, options, type } = req.body;

    const data = await Question.create({
      question,
      options,
      type,
    });

    res.json({
      status: "success",
      message: "Questions with options inserted successfully",
      data,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
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
