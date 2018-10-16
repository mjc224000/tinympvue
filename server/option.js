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
    appid:'wxe01f5e3d6ba2e2d7',
    secret:"3b88a127f73fc820d124b44348275b0b"
}