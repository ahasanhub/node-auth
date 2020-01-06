'use strict'
const userService = require('../services/user');

exports.getUsers = async function (req, res, next) {
    try {
        let message = await userService.getUsers();
        res.status(200).send(message);
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