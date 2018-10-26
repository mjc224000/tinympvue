let sillyDateTime = require('silly-datetime');

function message(req, res) {
    let date = sillyDateTime.format(new Date(), 'YYYY-MM-DD HH:mm');
    let {message, title} = req.query;
    console.log(req.models);;
    console.log(title, req.headers);
   // messageModal.create({message, title, date}, function (err) {
        if (!err) res.send('ok');
  //  })
    res.send('ok');
}

module.exports = {message}
