// 获取用户的标识符很麻烦，前端调用login拿到code,必须后端使用 code做请求
//https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/code2Session.html

let option = require('./option'),
    curl = require('curl')

function code2SessionUrl({appid, secret, code}) {
    return `https://api.weixin.qq.com/sns/jscode2session?appid=${appid}&secret=${secret}&js_code=${code}&grant_type=authorization_code `
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

function auth(req, res) {
// 获取code  前端通过wx.login 获取 code, 后端使用 curl 更加code 请求 openid;
    console.log(res);
    let userType = 0;
    let query = req.query;
    let {person, role} = req.models;
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
                    user.getRole(function (err, doc) {
                        let name = doc && doc.name;
                        if (name === 'admin') {
                            userType = 1;
                            res.json({userType});
                            return
                        } else {
                            res.json({userType});
                            return
                        }
                    })
                }
            })

        } else {

        }

    })


}

module.exports = {
    auth,
    setRole,
    showUsers,
    unAuth
}