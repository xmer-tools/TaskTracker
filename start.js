var server = require('./server.js');

// Server.js returns an object that has an app that connects with express and a io that connects with socket.io
server(svr => {
    var http = require('http').createServer(svr.app);

    http.listen(8080, () => {
        console.log("Listening to 8080");
    });
});
