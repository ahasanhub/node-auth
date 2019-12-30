var morgan = require('morgan');
var bodyParser = require('body-parser');
//setup global middleware here

module.exports = function (app) {
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
};