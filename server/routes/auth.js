const router = require('express').Router();
const UserModel = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// CREATE
router.post('/register', async (req, res) => {
    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
          ).toString(),
        isAdmin: req.body.isAdmin, 
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
      const user = await UserModel.findOne({
        email: req.body.email,
      });
      !user && res.status(401).json("Wrong password or username!");
  
      var bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
      var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
  
      // send response without password field
      const { password, __v, ...info } = user._doc;
  
      accessToken = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.PASS_SECRET,
        { expiresIn: "5d" }
      );
  
      decryptedPassword !== req.body.password
        ? res.status(401).json("Wrong password or username!")
        : res.status(200).json({ ...info, accessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = router;