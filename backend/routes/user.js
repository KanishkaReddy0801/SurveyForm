const { verifyToken } = require('./verifytoken');
const {verifyTokenAndAuthorization}=require('./verifytoken')
const {verifyTokenAndAdmin}=require('./verifytoken');

const router=require('express').Router();

// router.get('/usertest',(req,res)=>{
//     res.send("user test Successfull")
// })
// //get means user want some data
// //req we psot from user like he putiing username password
// //after this function we send response
//})//post when user put data and
//----------------------------------------


//before update we check user password
router.put("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString();
      }
    
      try {//find user by id then update funt with query
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
}) 

//Delete Method

//agian verify the user call it authorisation
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {//query find and delter
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been again deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get user by admin
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {//query is findById
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//For admin to take all the user or latest
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {//sort then limit
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//here admin get user when user created year and month

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports=router
