var mongoose = require('mongoose');
var Column = require('./column.js');

const connectDb = () => {
    return mongoose.connect("mongodb://user:insecurePassword@xmer.pw/tasks", {useNewUrlParser: true});
}

module.exports = {
    connectDb, 
    Column
};

// db.createUser( 
//     { 
//         user: "user",
//         pwd: "insecurePassword",
//         roles: [ "readWrite"] 
//     } 
// );