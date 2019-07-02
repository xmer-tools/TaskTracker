var mongoose = require('mongoose');
var Column = require('./column.js');
var Task = require('./task');

const connectDb = () => {
    return mongoose.connect("mongodb://user:insecurePassword@xmer.pw/tasks", {useNewUrlParser: true});
}

module.exports = {
    connectDb, 
    Column,
    Task
};

// db.createUser( 
//     { 
//         user: "user",
//         pwd: "insecurePassword",
//         roles: [ "readWrite"] 
//     } 
// );