const router = require('express').Router();
const ProductModel = require('../models/Product');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('../verifyToken');

// CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new ProductModel(req.body);
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
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

// FIND ONE
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await ProductModel.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET ALL
router.get('/', async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
        let products;

        if (qNew) {
        products = await ProductModel.find().sort({ createdAt: -1 }).limit(5)
        }
        else if (qCategory) {
            products = await ProductModel.find({
                categories: {
                    $in: [qCategory],
                },
            });
        }
        else {
            products = await ProductModel.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;