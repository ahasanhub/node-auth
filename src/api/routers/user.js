'use strict'

const router = require('express').Router();
const userController = require('../controllers/user');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {
    ObjectID
} = require('mongodb');


//[api/users]
router.route('/')
    .post(userController.createUser)
    .get(userController.getUsers);

router.route('/login').post(async (req, res) => {
    //Login a registered user
    try {
        const {
            email,
            password
        } = req.body;
        const user = await User.findByCredentials(email, password);
        if (!user) {
            res.status(401).send({
                error: 'Login failed! check authentication'
            });
        }
        const token = await user.generateAuthToken();
        res.status(200).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send({
            error: 'Bad request'
        })
    }
});
router.route('/me')
    .get(auth, async (req, res) => {
        //View logged in user profile
        res.status(200).send(req.user);

    })
    .put(auth, async (req, res) => {
        //update user profile
        const updates = Object.keys(req.body);
        const allowedUpdates = ["name", "email", "age", "password"];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        const _id = req.user._id;

        if (!isValidOperation)
            res.status(400).send({
                error: 'Invalid request'
            });
        if (!ObjectID.isValid(_id)) {
            return res.status(404).send({
                error: 'Invalid request'
            });
        }
        try {
            updates.forEach((update) => req.user[update] = req.body[update]);
            await req.user.save();
            res.status(201).send(req.user);
        } catch (error) {
            res.status(400).send({
                error: 'Invalid request'
            });
        }
    })
    .delete(auth, async (req, res) => {
        //delete user 
        if (!ObjectID.isValid(req.user._id)) {
            return res.status(404).send({
                error: 'Invalid request'
            });
        }
        try {
            await req.user.remove();
            req.send(req.user);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error'
            });
        }
    });

router.route('/logout').post(auth, async (req, res) => {
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
router.route('/logout-all').post(auth, async (req, res) => {
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