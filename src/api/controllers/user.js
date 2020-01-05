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