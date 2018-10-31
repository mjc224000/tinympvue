let {operator} = require('./utils');
const express = require('express');
let bodyParser = require('body-parser');
let queue=require('./queue');
const model = require('./model');
const orm = require('orm');
let https = require('https');
let http = require('http');
const {auth, setRole, showUsers, unAuth, delete_auth, check, login} = require('./auth_manage');
const {message,deleteMessage,messageList,putMessage}=require('./msg_manager');
const options = require('./option');
let currentNumber = 0;
let app = express();
let from=0,to=0;
app.use('/img',express.static('./img'));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', "*");
    setTimeout(next)
})
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(orm.express(model.url, {define: model.define}));
app.use(function (req, res, next) {
    let {models} = req;
    req.chain = operator(models);
    next();
});
app.use(check);
app.use('/queue',queue);
app.delete('/setRole', delete_auth);
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
app.get('/login', login);
// 后台管理，取消管理员权限。
app.get('/unAuth', unAuth);
// 废弃
app.get('/updateFrom', function (req, res) {
    from = req.query.fromNumber;
    res.send('ok');
});
// 废弃
app.get('/updateTo',function (req,res) {
    to=req.query.toNumber;
    res.send('ok');
});
// 废弃
app.get('/fromToNumber', function (req, res) {
    res.json({from, to});
})
// msg relevant
app.get('/msg',message);
app.put('/msg',putMessage);
app.get('/msgList',messageList);
app.delete('/msg',deleteMessage);
let server = https.createServer(options, app);
http.createServer(app).listen(3001);


model.initDB().then(function () {
    server.listen(443, function () {
        console.log('服务器开始监听');
    })
})


