'use strict'
const User = require('../models/user');

//get all users
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
//create new users
exports.createUser = async function (data) {
    try {
        const user = new User(data);
        return await user.save();
    } catch (error) {
        throw new Error(error.message);
    }
}
//get access token
exports.getToken = async function (user) {
    try {
        return await user.generateAuthToken();
    } catch (error) {
        throw new Error(error.message);
    }
}