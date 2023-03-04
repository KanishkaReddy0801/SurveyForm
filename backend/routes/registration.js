const express = require("express");
const router = express.Router();
const user = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "RESTAPI";

router.get("/register", async (req, res) => {
  try {
    const users = await user.find({});
    if (!users) {
      return res.status(404).json({
        status: "Failed",
        message: "Users not found",
      });
    }
    res.json({
      status: "success",
      data: users,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

router.get("/register/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userObj = await user.findById(id);
    if (!userObj) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }
    res.json({
      status: "success",
      data: userObj,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});



router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, username, phone, profession, confirmPassword } =
      req.body;

    const user_obj = await user.findOne({ email });
    if (user_obj) {
      return res.status(409).json({
        status: "Failed",
        message: "User already exist",
      });
    }
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          status: "Failed",
          message: err.message,
        });
      }
      const data = await user.create({
        username,
        email,
        password: hash,
        phone,
        profession,
        confirmPassword,
      });
      res.json({
        status: "success",
        message: "Registration Successful",
        data,
      });
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = router;
