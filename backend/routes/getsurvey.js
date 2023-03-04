const express = require("express");
const route = express.Router();

route.use(express.json());

const data = require("../models/survey");
const cors = require("cors");
//route.use(cors());

route.get("/getallsurvey", cors(), async (req, res) => {
  try {
    const info = await data.find({ surveys: req.surveys });
    res.status(200).json({
      status: "passed",
      info,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

// DELETE survey by ID
route.delete("/deletesurvey/:id", cors(), async (req, res) => {
  try {
    const deletedSurvey = await data.findByIdAndDelete(req.params.id);
    if (!deletedSurvey) {
      return res.status(404).json({
        status: "failed",
        message: "Survey not found",
      });
    }
    res.status(200).json({
      status: "passed",
      message: "Survey deleted successfully",
      deletedSurvey,
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});


//suvey by id
route.get("/getallsurvey/:id", cors(), async (req, res) => {
  try {
    const info = await data.findById(req.params.id);
    res.status(200).json(info);
  } catch (e) {
    res.status(400).json({
      status: "failed",
      message: e.message,
    });
  }
});

module.exports = route;