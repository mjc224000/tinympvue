const fs = require('fs');
let privatekey = fs.readFileSync('./openssl/privatekey.pem'),
    pc = fs.readFileSync('./openssl/certificate.pem');
module.exports = {
    key: privatekey,
    cert: pc
}