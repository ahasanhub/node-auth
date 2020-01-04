const mongoose = require('mongoose');
const uri = 'mongodb://nodeauth:node123456@ds039950.mlab.com:39950/node-auth';
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
mongoose.connect(uri, options)
    .then(() => console.log('connected to database'))
    .catch(() => console.log('failed connected to database'));

module.exports = mongoose;