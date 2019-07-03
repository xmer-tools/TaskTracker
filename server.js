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
                        console.log("ERR 1", err);

                    socket.emit('initColumns', list);
                });

                socket.on('addColumn', column => {
                    var col = new Column();
                    col.title = column.title;

                    // Saves the column via mongoose
                    col.save((err, record) => {
                        if(err)
                            console.log("ERR 2", err);

                        // Sends the column to all users
                        else 
                            io.emit('addColumn', record);
                    });
                });

                socket.on('renameColumn', (id, title) => {
                    Column.findById(id, (err, record) => {
                        if(err)
                            console.log("ERR 3", err);

                        record.title = title;
                        record.save(err => {
                            if(err)
                                console.log("ERR 4", err);

                                socket.broadcast.emit('renameColumn', id, title);
                        });
                    });
                });

                // Adds a task to the column (specified by id)
                socket.on('addTask', (id, title) => {
                    Column.findById(id, (err, record) => {
                        if(err)
                            console.log("ERR 5", err);
                        
                        record.tasks.push({title: title});
                        record.save(err => {
                            if(err)
                                console.log("ERR 6", err);

                            else 
                                io.emit('addTask', id, record.tasks[record.tasks.length - 1]);
                        });
                    });
                });

                socket.on('moveTask', (task, from, to) => {
                    Column.findById(from, (err, fromRec) => {
                        if(err)
                            console.log("ERR 7", err);

                        var tRecord = fromRec.tasks.splice(
                            fromRec.tasks.findIndex(t => t._id === task.id), 1
                        )[0];

                        Column.findById(to, (err, toRec) => {
                            if(err)
                                console.log("ERR 9", err);

                            toRec.tasks.push(tRecord); 

                            // This save order was chosen to reduce the risk of losing a task
                            toRec.save(err => {
                                if(err)
                                    console.log("ERR 10", err);

                                fromRec.save(err => {
                                    if(err)
                                        console.log("ERR 8", err);

                                    socket.broadcast.emit('moveTask', task, from, to);
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    cb({ app, io });
};