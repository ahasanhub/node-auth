'use strict'
const express = require('express');
const app = express();
const apiRoute = require('./api/api');
//connect mongodb
require('./db/mongoose')
//set middleware
require('./middleware/app')(app);
//set router
app.use('/api', apiRoute);

module.exports = app;