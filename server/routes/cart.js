const router = require('express').Router();
const CartModel = require('../models/Cart');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('../verifyToken');

// CREATE
router.post('/', verifyToken, async (req, res) => {
    const newProduct = new CartModel(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await CartModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// FIND USER CART
router.get('/find/:userId', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await CartModel.findOne({userId: req.params.userId});
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await CartModel.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
});




// GET MONTHLY INCOME

router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const income = await OrderModel.aggregate([
            { $match: { productId: productId } },
            { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$amount" } } },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

module.exports = router;