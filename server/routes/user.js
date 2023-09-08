const express = require('express');
const router = express.Router();
const CryptoJS = require("crypto-js");
const UserModel = require('../models/User');
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../verifyToken');

router.put('/:id', async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString();
    }

    try {
        console.log(req.body);
        const updatedUser = await UserModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        const { password, ...others } = updatedUser._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }

});

router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query 
         ? await UserModel.find().sort({ _id: -1 }).limit(5)
            .where("isAdmin").equals(false)
         : await UserModel.find().where("isAdmin").equals(false);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await UserModel.aggregate([
            { 
                $match: { 
                    createdAt: { 
                        $gte: lastYear 
                    } 
                } 
            },
            {
                $project: {
                    month: { 
                        $month: "$createdAt" 
                    },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;