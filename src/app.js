const express = require('express');
const app = express();
const api = require('./api/api');
//connect mongodb
require('./db/mongoose')
//set middleware
require('./middleware/appMiddleware')(app);
//set router
app.use('/api', api);

module.exports = app;