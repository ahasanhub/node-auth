const mongoose = require('mongoose')
mongoose.connect('mongodb://citestdb:citestdb123@ds363038.mlab.com:63038/ci-test-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

let Schema = mongoose.Schema;
let todoSchema = new Schema({
    name: String,
    completed: Boolean
});

let Todo = mongoose.model('Todo', todoSchema);

Todo.create({
    name: 'This is sample task1',
    completed: false
}, function (err, todo) {
    console.log({ err, todo });
});

