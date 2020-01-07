'use strict'
const User = require('../models/user');

//get all users
exports.getUsers = async function () {
    try {
        return await User.find();
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
//get user credential
exports.getUserCredential = async function (email, password) {
    try {
        return await User.findByCredentials(email, password);
    } catch (error) {
        throw new Error(error.message);
    }
}

//update me
exports.updateMe = async function (updatedUser) {
    try {
        return await updatedUser.save();
    } catch (error) {
        throw new Error(error.message);
    }
}
//delete me
exports.deleteMe = async function (deletedUser) {
    try {
        return await deletedUser.remove();
    } catch (error) {
        throw new Error(error.message);
    }
}
//logout me
exports.userLogout = async function (logoutedUser) {
    try {
        return await logoutedUser.save();
    } catch (error) {
        throw new Error(error.message);
    }
}