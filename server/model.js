
const orm = require('orm');
var opts = {
    host: 'localhost',
    database: 'queue',
    protocol: 'mysql',
    port: '3306',
    query: {pool: true},
    username: 'root',
    password: '7898ikuojl'
};
let url = 'mysql://root:7898ikuojl@localhost/queue';

/* let opts = {
    host: 'mjc224000.top',
    database: 'queue',
    protocol: 'mysql',
    port: '3306',
    query: {pool: true},
    username: 'root',
    password: '7898ikuojl'
};
let url = 'mysql://root:7898ikuojl@mjc224000.top/queue';*/
let Person = {
    personId: {type: 'serial', key: true},
    nickName: String,
    gender: String,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String,
    openid: String,
}
let Role = {
    roleid: {type: 'serial', key: true},
    name: String
}
let Message={
    messageId:{
        type:'serial',key:true
    },
    message:String,
    enable:Boolean,
    title:String,
    time:{type:'date',time:true},
}
let QueueTime={
    queueTimeId:{
        type:'serial',key:true
    },
    time:{
        type:'date',
        time:true
    },
    fromNumber: Number,
    toNumber:Number
}


function initDB() {
    return new Promise(function (resolve, reject) {
        orm.connectAsync(opts).then(function (db) {
            let _Person = db.define("person", Person);
            let _Role = db.define("role", Role);
            let _Message=db.define('message',Message);
             db.define('queueTime',QueueTime);
            _Person.hasOne('role', _Role, {reverse: 'user'});
            _Message.hasOne('person',_Person,{reverse:'_from'});
            db.sync(function (err) {
                if (err) throw err;
                _Role.find({name: 'admin'}, function (err, doc) {
                    if (err) return

                    if (doc.length) {
                        console.log('admin 已经存在')
                    } else {
                        _Role.create({name: 'admin'}, function (err) {
                            if (!err)
                                console.log('admin 创建')

                        })
                        _Role.create({name: 'client'}, function (err) {
                            if (!err)
                                console.log('client 创建')

                        })
                    }
                })
                resolve();
            })
        })
    })
}

function define(db, models, next) {
    let _Person = db.define("person", Person);
    let _Role = db.define("role", Role);
    _Person.hasOne('role', _Role, {reverse: 'user'});
    let _Message=db.define('message',Message);
    let _QueueTime=db.define('queueTime',QueueTime);
    if (models) {
        models.person = _Person;
        models.role = _Role;
        models.message=_Message;
        models.queueTime=_QueueTime
        next();
    }
}

module.exports = {define, url, initDB};