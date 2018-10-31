// 获取用户的标识符很麻烦，前端调用login拿到code,必须后端使用 code做请求
//https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/code2Session.html
let token = 'oy8EB0ZyvZkXFK20Q4E0nL8DX3SQ';
let passwd = '123456';
let option = require('./option'),
    curl = require('curl')
var validate = /^\/(setRole)|(api\/users)|(msg$)/

function check(req, res, next) {
    if (!validate.test(req.url)) {//如果不是权限路由 往下走
        next();
    } else {
        if (req.headers['authorization'] === token) { // 是权限路由 验证请求头的authorization字段
            console.log('通过')
            next();
        } else {
            res.send('not ok');
        }
    }
}

function code2SessionUrl({appid, secret, code}) {
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code `
}

function login(req, res) {
    const {pw} = req.query;
    console.log(req.headers,pw);
    if (pw == passwd) {
        res.send(token);
    } else {
        res.writeHead(200, 'forbidden');
        res.end('forbidden')
    }

}

function setRole(req, res) {
    let query = req.query;
    let {person, role} = req.models;
    const {openid} = query;
    person.find({openid}, function (err, persons) {
        if (persons.length) {
            role.find({name: 'admin'}, function (err, roles) {
                if (!err) {
                    persons[0].setRole(roles[0], function (err) {
                        if (!err) {
                            console.log('设置成功');
                            res.end('ok');
                        }
                    })
                }

            })

        }
    })
}

function showUsers(req, res) {
    let {person} = req.models;
    person.find({}, function (err, persons) {
        if (err) return
        res.json({list: persons})

    })
}

function unAuth(req, res) {
    let {person, role} = req.models;
    let query = req.query;
    const {openid} = query;
    person.find({openid}, function (err, persons) {
        if (err) return;

        role.find({name: 'client'}, function (err, roles) {
            if (err) return;
            persons[0].setRole(roles[0], function (err) {
                if (!err) {
                    res.send('ok');
                }
            })
        })
    })

}

function delete_auth(req, res) {
    let {person} = req.models;
    let query = req.query;
    const {openid} = query;
    if (openid) {
        person.find({openid}).remove(function (err) {
            if (!err) {
                res.send('ok');
            }
        })
    }
}
// wx小程序登录
function auth(req, res) {
// 获取code  前端通过wx.login 获取 code, 后端使用 curl 更加code 请求 openid;
    let userType = 0;
    let query = req.query;
    let {person} = req.models;
    let {nickName, gender, language, city, province, country, code, avatarUrl} = query;
    let url = code2SessionUrl({...option, code});
    curl.get(url, {}, function (err, _res, body) {
        body = JSON.parse(body);
        if (!err) {
            let openid = body['openid'];
            // 数据库里是否存有openid,没有的话创建一个用户，返回0，有的话判断用户角色
            person.find({openid}, function (err, doc) {
                if (err) return
                let user = doc && doc[0] || undefined;
                if (!user || !user.avatarUrl) {
                    if (!user) {
                        person.create({
                            nickName,
                            gender,
                            language,
                            city,
                            province,
                            country,
                            openid,
                            avatarUrl
                        }, function (err) {
                            if (err) throw err;

                            res.json({userType});
                            return
                        })
                    } else {
                        user.nickName = nickName;
                        user.gender = gender;
                        user.language = language;
                        user.city = city;
                        user.province = province;
                        user.country = country;
                        user.avatarUrl = avatarUrl;
                        user.save(function (err) {
                            if (err) throw err
                        })
                        res.json({userType});
                        return
                    }

                } else {
                    user.getRole(function (err, doc) {
                        let name = doc && doc.name;
                        if (name === 'admin') {
                            userType = 1;
                            res.json({userType,token});
                            return
                        } else {
                            res.json({userType});
                            return
                        }
                    })
                }
            })

        } else {
                 return
        }

    })


}

module.exports = {
    auth,
    setRole,
    showUsers,
    unAuth,
    delete_auth,
    check,
    login
}