const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    // socket.emit('newEmail', {
    //     from: 'mike@ex.com',
    //     text: 'sgjd dsfu',
    //     createdAt: 123
    // });

    /*socket.emit('newMessage', {
        from: 'mike',
        text: 'sgjddsfu',
        createdAt: 123123
    });*/

    // socket.on('createEmail', (newEmail) => {
    //     console.log('createEmail', newEmail);
    // });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from the server');

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

server.listen(3000, () => {
    console.log(`server is up on port ${port}`);
});
