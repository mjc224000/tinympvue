let express = require('express')
let router = express.Router();
router.use(function timeLog(req, res, next) {
    next()
})
router.get('/', function (req, res) {
    let {template}=req.models;
    template.find({},function (err,docs) {
        if(err){
            res.send('not ok')
        }else {
            res.send(docs);
        }
    })
}).post('/', function (req, res) {
    let data = req.body;
    let {content} = data;
    let {template} = req.models;
    if (template) {
        template.create({content}, function (err) {
            if (!err) {
                res.send('ok');
            }
        })
    } else {
        res.send('not ok');
    }

}).put("/", function (req, res) {
    console.log(req.body);
    res.send('收到');
})
module.exports = router;