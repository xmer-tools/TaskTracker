var mongoose = require('mongoose');
var taskSchema = require('./task');

const columnSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true
    },
    tasks: [taskSchema]
});

const column = mongoose.model('Column', columnSchema);
module.exports = column;