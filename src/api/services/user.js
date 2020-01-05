'use strict'
const User = require('../models/user');

exports.getUsers = async function () {
    try {
        let message = await new Promise((resolve, reject) => {
            setTimeout(() => resolve('This is test message.'), 1000);
        });
        return message;
    } catch (error) {
        throw new Error('Something went wrong!!!');
    }
}