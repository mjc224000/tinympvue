function message(req, res) {
    let messageModel=req.models.message
    let {message, title} = req.query;
    messageModel.create({message, title,time: new Date()}, function (err) {
        console.log(err);
        if (!err) res.send('ok');
 })
}
function deleteMessage(req,res){
    let {message}=req.models.message;
    let {messageId}=req.query;
    message.find({messageId}).remove(function (err) {
        if(!err){
            res.send('ok');
        }
    })
}
function messageList(req,res){
    let {message}=req.models;
    message.find({},function (err,docs) {
            if(!err){

                docs=docs.map(v=>{
                    v.time=new Date(v.time).toLocaleString();
                    return v;
                })
                let c=docs[0];
                for(var i=0;i<100;i++){
                    docs.push(c);
                }
                res.json(docs);
            }
        })
}

module.exports = {message,messageList,deleteMessage};
