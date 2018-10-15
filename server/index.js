const express = require('express');
const model = require('./model');
const orm = require('orm');
let https = require('https');
const {auth, setRole, showUsers} = require('./auth_manage');

const options = require('./option');
let currentNumber = 0;
let app = express();
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    setTimeout(next)
})

app.use(orm.express(model.url, {define: model.define}));

app.get('/', function (req, res) {
    console.log(req.query);
    res.send('丛后台传过来的东西')
});
app.get('/setRole', setRole)
app.get('/auth', auth);
app.get('/api/users', showUsers);
app.get('/update', function (req, res) {
    currentNumber = req.query.updateNumber;
    console.log(req.query);
    res.send('ok');
});
app.get('/currentNumber', function (req, res) {
    res.send(currentNumber.toString());
})


let server = https.createServer(options, app);


model.initDB().then(function () {
    server.listen(1443, 'localhost', function () {
        console.log('服务器开始监听');
    })
})


