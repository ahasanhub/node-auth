'use strict'
const router = require('express').Router();
//api router will mount other routers
//for all our resources
router.use('/users', require('./routes/user'));
router.use('/posts', require('./routes/post'));

module.exports = router;