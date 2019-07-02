var mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true
    },
    description: {
        type: "String"
    }
});

module.exports = taskSchema;