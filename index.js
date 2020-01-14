'use strict'
//Environment variable config
require('dotenv').config();
var config = require('./src/config/config');
const app = require('./src/app');
var logger = require('./src/util/logger');


app.listen(config.port, () => console.log(`Server is run on port :${config.port}`));
logger.log('listening on http://localhost:' + config.port);