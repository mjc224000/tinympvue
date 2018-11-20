let express = require('express')
let router = express.Router();
router.use(function timeLog(req, res, next) {
    next()
})
router.get('/', function (req, res) {
    let {Vars} = req.models;
    Vars.find({}, function (err, docs) {
        if (err) {
            res.send('not ok')
        } else {
            res.send(docs);
        }
    })
}).post('/', function (req, res) {
    let data = req.body;
    let {content} = data;
    let {Vars} = req.models;
    if (Vars && content) {
        Vars.create({content}, function (err) {
            if (!err) {
                res.send('ok');
            }
        })
    } else {
        res.send('not ok');
    }

}).put("/", function (req, res) {
    let data = req.body;
    let {content, tplId} = data;
    console.log(data);
    let {Vars} = req.models;
    if (Vars && content) {
        Vars.find({tplId}, function (err, docs) {
            if (!docs[0]) {
                res.send('not ok');
                return
            }
            docs[0].content = content;
            docs[0].save();
            res.send('ok');
        })
    }

}).delete('/', function (req, res) {
    let {tplId} = req.query
    let {Vars} = req.models;
    if (tplId && Vars) {
        Vars.find({tplId}).remove(function (err) {
            if(err){
                res.send('not ok');
                return
            }else {
                res.send('ok');
            }
        });
    }
})
module.exports = router;