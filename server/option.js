const fs = require('fs');
let privatekey = fs.readFileSync('./openssl/privatekey.pem'),
    pc = fs.readFileSync('./openssl/certificate.pem');
module.exports = {
    key: privatekey,
    cert: pc,
    appid:'wxe01f5e3d6ba2e2d7',
    secret:"fe4922e0856d4c487703581dda62f0ee"
}