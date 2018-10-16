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
//let url = 'mysql://root:7898ikuojl@mjc224000.top/queue';
let Person = {
    personId: {type: 'serial', key: true},
    nickName: String,
    gender: String,
    language: String,
    city: String,
    province: String,
    country: String,
    avatarUrl: String,
    openid: String
}
let Role = {
    roleid: {type: 'serial', key: true},
    name: String
}

function initDB() {
    return new Promise(function (resolve, reject) {
        orm.connectAsync(opts).then(function (db) {
            define(db);
            db.sync(function (err) {
                if (err) throw err;

                resolve();
            })
        })
    })
}

function define(db, models, next) {
    let _Person = db.define("person", Person);
    let _Role = db.define("role", Role);
    _Person.hasOne('role', _Role, {reverse: 'user'})

    if (models) {
        models.person = _Person;
        models.role = _Role;
        next();
    } else {
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
    }

}

module.exports = {define, url, initDB};