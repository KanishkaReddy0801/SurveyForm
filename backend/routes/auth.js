const router = require("express").Router();
const User = require("../models/user"); //call its schema
const CryptoJS = require("crypto-js"); //for hashing password
const jwt = require("jsonwebtoken"); //it verify the user,id password

//Register so post to take data

router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    phone:req.body.phone,
    profession:req.body.profession,

    password:req.body.password,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),

    confirmPassword:req.body.confirmPassword,
    confirmPassword: CryptoJS.AES.encrypt(
      req.body.confirmPassword,
      process.env.PASS_SEC
    ).toString(),


  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  try {
    //first find our user in db..//here mongo query write to find
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json("Wrong Username,Please Try again");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password) {
      return res.status(401).json("Wrong Password Try Again!");
    }

    //it for authentication
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    //if everythings is ok then we return it user
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;