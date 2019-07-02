var path = require('path');

var express = require('express'),
    app = express();

const taskList = [{
    name: "Test",
    description: "Test Desc"
}];

module.exports = cb => {
    app.use('/public', express.static(path.join(__dirname, '.public'),{
        index: false,
        extensions: ['js', 'html']
    }));

    app.get('/*', (req, res) => {
       res.sendFile(path.join(__dirname + '/index.html'));
    });

    const io = io => {
        io.on('connection', socket => {
            console.log('user connected');

            socket.emit('initTasks', taskList);
            socket.on('addTask', task => {
                console.log('new task!', task);
                taskList.push(task);
            });
        });
    }

    cb({ app, io });
};