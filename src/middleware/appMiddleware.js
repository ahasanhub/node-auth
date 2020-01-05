const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

//setup global middleware here

module.exports = function (app) {
    app.use(cors());
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());
};