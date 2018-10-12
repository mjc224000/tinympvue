module.exports = function (ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send('something');
    });
}