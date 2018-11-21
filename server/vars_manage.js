let express = require('express')
let router = express.Router();
router.use(function timeLog(req, res, next) {
    next()
})
router.get('/', function (req, res) {
    let {Vars} = req.models;
    Vars.find({}, function (err, docs) {
        if (err) {
            console.log(err);
            res.send('not ok')
        } else {
            res.send(docs);
        }
    })
}).post('/', function (req, res) {
    let data = req.body;
    let {type, disc, symbol,} = data;
    let {Vars} = req.models;
    if (Vars && type) {
        Vars.create({type, disc, symbol,latest_value: 0}, function (err) {
            console.log(err);
            if (!err) {
                res.send('ok');
            }
        })
    } else {
        res.send('not ok');
    }
}).put("/", function (req, res) {
    let data = req.body;
    let {type, varId, disc,symbol,} = data;
    let {Vars} = req.models;
    if (Vars && type && disc) {
        Vars.find({varId}, function (err, docs) {
            if (!docs[0]) {
                res.send('not ok');
                return
            }
            docs[0].type = type;
            docs[0].disc = disc;
            docs[0].symbol = symbol;
            docs[0].save();
            res.send('ok');
        })
    }
}).delete('/', function (req, res) {
    let {varId} = req.query
    let {Vars} = req.models;
    if (varId && Vars) {
        Vars.find({varId}).remove(function (err) {
            if (err) {
                res.send('not ok');
                return
            } else {
                res.send('ok');
            }
        });
    }
})
module.exports = router;