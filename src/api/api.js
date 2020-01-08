'use strict'
const router = require('express').Router();
const v1Route = require('./version/v1');

//api route will mount other version routes
router.use('/v1', v1Route);

module.exports = router;