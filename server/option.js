const fs = require('fs');
// 公司
/*let key = fs.readFileSync('./openssl/215073622990525.key'),
    cert = fs.readFileSync('./openssl/215073622990525.pem');*/

// 阿里云
let key = fs.readFileSync('./openssl/1531319468158.key'),
    cert = fs.readFileSync('./openssl/1531319468158.pem');
module.exports = {
    key: key,
    cert: cert,
    appid:'wx0b13931ed73bcf91',
    secret:"8dbb7f28d9b71a9893e13f3769c1a9fc"
}
