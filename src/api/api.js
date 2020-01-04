'use strict'
const router = require('express').Router();
//api router will mount other routers
//for all our resources
router.use('/users', require('./routers/user'));
router.use('/posts', require('./routers/post'));

module.exports = router;