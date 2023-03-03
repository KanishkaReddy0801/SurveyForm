const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const { route } = require("./registration");
const secret = "RESTAPI";

router.get("/createsurvey", (req,res) => {
  res.send("survey details created")
})

router.post("/createsurvey", async (req, res) => {
  try {
    console.log(req.body);

    const { name, startdate, enddate, description, otherCriteria, surveyType,fileUploaded } =
      req.body;

    const data = await Survey.create({
      name,
      startdate,
      enddate,
      description,
      otherCriteria,
      surveyType,
      fileUploaded
    });
    res.json({
      status: "success",
      message: "Survey details insertion Successful",
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