var path = require('path');

var express = require('express'),
    {Column, connectDb} = require('./mongoose/.connect.js');
    app = express();

module.exports = cb => {
    app.use('/public', express.static(path.join(__dirname, '.public'),{
        index: false,
        extensions: ['js', 'html']
    }));

    app.get('/*', (req, res) => {
       res.sendFile(path.join(__dirname + '/index.html'));
    });

    const io = io => {
        // Connects to the database before establishing the socket.io
        connectDb().then(() => {
            // Socket.io section
            io.on('connection', socket => {
                
                Column.find({}, (err, list) => {
                    if(err)
                        console.log(err);

                    socket.emit('initColumns', list);
                });

                socket.on('addColumn', column => {
                    var col = new Column();
                    col.title = column.title;

                    // Saves the column via mongoose
                    col.save((err, record) => {
                        if(err)
                            console.log(err);

                        // Sends the column to all users
                        else 
                            io.emit('addColumn', record);
                    });
                });

                socket.on('renameColumn', (id, title) => {
                    Column.findById(id, (err, record) => {
                        if(err)
                            console.log(err);

                        record.title = title;
                        record.save(err => {
                            if(err)
                                console.log(error);

                                socket.broadcast.emit('renameColumn', id, title);
                        });
                    });
                });

                // Adds a task to the column (specified by id)
                socket.on('addTask', (id, title) => {
                    Column.findById(id, (err, record) => {
                        if(err)
                            console.log(err);
                        
                        record.tasks.push({title: title});
                        record.save(err => {
                            if(err)
                                console.log(err);

                            else 
                                io.emit('addTask', id, record.tasks[record.tasks.length - 1]);
                        });
                    });
                });
            });
        });
    }

    cb({ app, io });
};