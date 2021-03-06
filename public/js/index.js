var socket = io();

socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createEmail', {
    //     to: 'jen@ex.com',
    //     text: 'Hey, this is'
    // });

    // socket.emit('createMessage', {
    //     from: 'Andrew',
    //     text: 'Yup, that works for me'
    // });

});

socket.on('disconnect', function () {
    console.log('Disconnected server');
});

// socket.on('newEmail', function (email) {
//     console.log('New email', email);
// });

socket.on('newMessage', function (message) {
    console.log('New message', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data) {
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', function (e) {

    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function () {
        
    });
});