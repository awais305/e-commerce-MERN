const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment', (req, res) => {
    const { amount, tokenId } = req.body;

    stripe.charges.create({
        amount: amount,
        currency: 'usd',
        source: tokenId,
    }, (err, stripeRes) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json(stripeRes);
        }
    });
});

module.exports = router;