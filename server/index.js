const express = require('express');
const msgManager = require('./msg_manager');
const WebSocket = require('ws');
const options = require('./option');
for(var key in options){
  console.log(options);
}
let app = express();
app.get('/', function (req, res) {
  res.send('nmsl')
})
var https = require('https');
let server = https.createServer(options, app);
const wss = new WebSocket.Server({server})
wss.on('connection', msgManager);

server.listen(1443, 'localhost', function () {
  console.log('服务器开始监听');
})

