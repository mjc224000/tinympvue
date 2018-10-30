var express = require('express')
var router = express.Router();
let _from=0,_to=0;
router.use(function timeLog (req, res, next) {

    next()
})
router.put('/from',function (req,res) {
   _from = req.query.from;
    res.send('ok');
})
 router.put('/to',function (req,res) {
     _to=req.query.to;
     res.send('ok');
 })

router.get('/',function (req,res) {
    res.json({from:_from, to:_to});

});
router.put('/',function (req,res) {
    let {from,to}=req.query;
    from=parseInt(from);
    to=parseInt(to);
    _from=from;
    _to=to;
    res.send('ok');
})
module.exports=router;