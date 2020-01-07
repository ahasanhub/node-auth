'use strict'
const userService = require('../services/user');
const {
    ObjectID
} = require('mongodb');

exports.getUsers = async function (req, res, next) {
    try {
        let users = await userService.getUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send('Bad request', error.message);
    }
}

exports.createUser = async function (req, res, next) {
    try {
        const user = await userService.createUser(req.body);
        const token = await userService.getToken(user);
        res.status(201).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send({
            error: 'Bad request'
        })
    }
}
exports.getUserCredential = async function (req, res, next) {
    //Login a registered user
    try {
        const {
            email,
            password
        } = req.body;
        const user = await userService.getUserCredential(email, password);
        if (!user) {
            res.status(401).send({
                error: 'Login failed! check authentication'
            });
        }
        const token = await userService.getToken(user);
        res.status(200).send({
            user,
            token
        });
    } catch (error) {
        res.status(400).send({
            error: 'Bad request'
        })
    }
}
exports.getMe = async function (req, res, next) {
    //View logged in user profile
    try {
        res.status(200).send(req.user);
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error.'
        });
    }

}
exports.updateMe = async function (req, res, next) {
    //update user profile
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "age", "password"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    const userId = req.user._id;

    if (!isValidOperation)
        res.status(400).send({
            error: 'Invalid request'
        });
    if (!ObjectID.isValid(userId)) {
        return res.status(404).send({
            error: 'Invalid request'
        });
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await userService.updateMe(req.user);
        res.status(201).send(req.user);
    } catch (error) {
        res.status(400).send({
            error: 'Invalid request'
        });
    }
}
exports.deleteMe = async function (req, res, next) {
    //delete user 
    if (!ObjectID.isValid(req.user._id)) {
        return res.status(404).send({
            error: 'Invalid request'
        });
    }
    try {
        await userService.deleteMe(req.user)
        res.send(req.user);
    } catch (error) {
        res.status(500).send({
            error: 'Internal server error'
        });
    }
}

exports.logoutMe = async function (req, res, next) {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await userService.userLogout(req.user);
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}
exports.logoutAll = async function (req, res, next) {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await userService.userLogout(req.user)
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
}