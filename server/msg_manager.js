function message(req, res) {
    let messageModel = req.models.message
    let {message, title} = req.query;
    messageModel.create({message, title, time: new Date()}, function (err) {
        if (!err) res.send('created');
    })
}

function putMessage(req, res) {
    let messageModel = req.models.message;
    let {messageId, message, title} = req.body;
    messageModel.find({messageId}, function (err, doc) {
        if (err) return;
        let msg = doc[0];
        if (msg) {
            msg.message = message;
            msg.title = title;
            msg.save(function (err) {
                if (err) return;
                res.send('modified');
            })
        }
    })
}

function deleteMessage(req, res) {
    let message = req.models.message;
    let {messageId} = req.body;
    console.log(req.body,'mesageid');
    message.find({messageId}).remove(function (err) {
        if (!err) {
            res.send('ok');
        }
    })
}

function messageList(req, res) {
    let {message} = req.models;
    message.find({}, function (err, docs) {
        if (!err) {

            docs = docs.map(v => {
                v.time = new Date(v.time).toLocaleString();
                return v;
            })
            res.json(docs);
        }
    })
}

module.exports = {message, messageList, deleteMessage, putMessage};
