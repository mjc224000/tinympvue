module.exports = function (ws, wss) {

        ws.on('message', function incoming(data) {
            // Broadcast to everyone else.
            console.log(data);

            wss.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(data);
                }
            });
        });

}
