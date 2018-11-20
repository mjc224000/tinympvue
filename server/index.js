let {operator} = require('./utils');
let tpl_manage=require('./tpl_manage');
let vars_manage=require('./vars_manage');
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
let app = express();
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
app.use('/tpl',tpl_manage);
app.use('/var',vars_manage);
app.delete('/setRole', delete_auth);
app.get('/', function (req, res) {
    console.log(req.query);
    res.send('丛后台传过来的东西')
});
app.get('/setRole', setRole)
app.get('/auth', auth);
app.get('/api/users', showUsers);

app.get('/login', login);
// 后台管理，取消管理员权限。

app.get('/unAuth', unAuth);

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


