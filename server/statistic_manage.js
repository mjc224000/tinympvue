let express = require('express')
let router = express.Router();
router.use(function timeLog(req, res, next) {
    next()
})
let compose = (string, vars) => {
    vars = vars || [];
    for (let i = 0; i < vars.length; i++) {
        string = string.replace(vars[i].symbol, vars[i].latest_value);
    }
    return string;
}
router.get('/', function (req, res) {
    let {template, Vars} = req.models;
    template.find({}, function (err, tpls) {
        Vars.find({}, function (err, vars) {
            tpls.forEach((tpl) => {
                let content = tpl.content;
                tpl.compose = compose(content, vars);
            })
            res.json(tpls);
        })
    })
}).post('/', function (req, res) {
    let {statistic, Vars} = req.models;
    let {type, value} = req.body;
    // 找到提交的变量类型
    Vars.find({type}, function (err, vars) {
        let _var = vars[0];
        if (_var) {
            _var.latest_value = value;
            //更新这个变量的最新值
            _var.save(function (err) {
                if (!err) {
                    statistic.create({type, value, time: new Date()}, function (err, doc) {
                        if (!err) {
                            doc.setVar(_var, function (err) {
                                if (!err) {
                                    res.send('ok');
                                }
                            })
                        }
                    })
                }
            })
        }
    })
    // statistic.create({type,value});
}).get('/vars', function (req, res) {
    let {Vars} = req.models;
    Vars.find({}, function (err, docs) {
        if (err) {
            res.send('not ok')
        } else {
            docs = docs || [];
            let ret = {};
            docs.forEach((item) => {

                ret[item.type] = item.latest_value;

            })
            res.send(ret);
        }
    })
}).get('/templates', function (req, res) {
    let {template} = req.models;
    template.find({}, function (err, docs) {
        if (err) {
            res.send('not ok');
        } else {
            res.send(docs);
        }
    })
})
;
module.exports = router;