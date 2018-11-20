let express = require('express')
let router = express.Router();
router.use(function timeLog(req, res, next) {
    next()
})
router.get('/', function (req, res) {
    let {template} = req.models;
    template.find({}, function (err, docs) {
        if (err) {
            res.send('not ok')
        } else {
            res.send(docs);
        }
    })
}).post('/', function (req, res) {
    let data = req.body;
    let {content} = data;
    let {template} = req.models;
    if (template && content) {
        template.create({content}, function (err) {
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
    let {template} = req.models;
    if (template && content) {
        template.find({tplId}, function (err, docs) {
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
    let {template} = req.models;
    if (tplId && template) {
        template.find({tplId}).remove(function (err) {
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