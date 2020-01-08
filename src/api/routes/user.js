'use strict'

const router = require('express').Router();
const userController = require('../controllers/user');
const auth = require('../middleware/auth');

//[api/users]
router.route('/')
    .post(userController.createUser)
    .get(auth, userController.getUsers);
//[api/users/login]
router.route('/login')
    .post(userController.getUserCredential);
//[api/users/me]
router.route('/me')
    .get(auth, userController.getMe)
    .put(auth, userController.updateMe)
    .delete(auth, userController.deleteMe);
//[api/users/logout]
router.route('/logout')
    .post(auth, userController.logoutMe);
//[api/users/logout-all]
router.route('/logout-all')
    .post(auth, userController.logoutAll);

module.exports = router;