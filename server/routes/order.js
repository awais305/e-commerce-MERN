const router = require('express').Router();
const OrderModel = require('../models/Order');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../verifyToken');

// CREATE
router.post('/', verifyToken, async (req, res) => {
    const newOrder = new OrderModel(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Order deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// FIND USER ORDER
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await OrderModel.findOne({userId: req.params.userId});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await OrderModel.aggregate([
            { 
                $match: { 
                    createdAt: {
                        $gte: previousMonth
                    } 
                }
            },
            {
                $project: {
                    month: { 
                        $month: "$createdAt" 
                    },
                }
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

module.exports = router;
