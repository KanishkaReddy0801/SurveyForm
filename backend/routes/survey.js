const express = require("express");
const router = express.Router();
const Survey = require("../models/survey");
const { route } = require("./registration");
const secret = "RESTAPI";
const multer = require('multer')
const upload = multer()

router.get("/createsurvey", (req,res) => {
  res.send("survey details created")
})

router.post("/createsurvey", upload.any(), async (req, res) => {
  try {
    console.log(req.body);

    const { fname, startdate, enddate, description, criteria, surveytype } =
      req.body;
      const upload = req.files

    const data = await Survey.create({
      fname,
      startdate,
      enddate,
      description,
      criteria,
      surveytype,
      upload
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