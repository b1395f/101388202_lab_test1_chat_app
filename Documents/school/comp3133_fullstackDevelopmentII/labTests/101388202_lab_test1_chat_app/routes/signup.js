const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.post('/signup', async (req, res) => {
    console.log(req.body);
    const newUser = new User(req.body);

    try {
        await newUser.save((err) => {
            if (err) {
                res.status(400).send(err);
            } else {
                res.send(newUser);
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;