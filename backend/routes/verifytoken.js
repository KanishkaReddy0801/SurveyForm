const jwt = require("jsonwebtoken"); //it verify the user,id password

//we also have body but we can also set header here
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1]; //this is forset header for put
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      //it give two things err and data
      if (err) res.status(403).json("Token not valid Please check");
      req.user = user;
      next(); //this will continue user next function
    });
  } else {
    return res.status(401).json("You are not authenticated please confirm");
  }
};
// this is for authorisation if id=user param or admin then login
const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    //call above function
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

//this is for admin verfication
const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {//here only change
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};