const express = require('express');
const request=require('request');
const msgManager = require('./msg_manager');
const WebSocket = require('ws');
const options = require('./option');
let app = express();
app.get('/', function (req, res) {
  console.log(req.query);
  res.send('丛后台传过来的东西')
})
var https = require('https');
let server = https.createServer(options, app);
const wss = new WebSocket.Server({server})
wss.on('connection', msgManager);

server.listen(1443, 'localhost', function () {
  console.log('服务器开始监听');
})

