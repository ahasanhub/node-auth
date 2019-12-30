const mongoose = require('mongoose');
mongoose.connect('mongodb://nodeauth:node123456@ds039950.mlab.com:39950/node-auth', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('connected to database')).catch(() => console.log('failed connected to database'));

module.exports = mongoose