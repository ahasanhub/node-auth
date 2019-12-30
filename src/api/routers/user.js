'use strict'
const router = require('express').Router();
const User = require('../models/user');
//test user route
router.route('/').get(async (req, res) => {
    res.json({ message: 'This is Ahasan!!!' });

});
//Register user
router.route('/').post(async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send({ error: 'Bad request' })
    }
});
router.route('/login').post(async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = res.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            res.status(401).send({ error: 'Login failed! check authentication' });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send({ error: 'Bad request' })
    }
});
router.route('/me').get(async (req, res) => {
    //View logged in user profile
    res.status(200).send(res.user);

}).put(async (req, res) => {
    //update user profile
}).delete(async (req, res) => {
    //delete user 

});

router.route('/logout').post(async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
});
router.route('/logout-all').post(async (req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
});
module.exports = router;