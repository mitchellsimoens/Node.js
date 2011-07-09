/*
To create a key and crt file:
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
 */

var https = require('https'),
    fs    = require('fs');

var options = {
    key  : fs.readFileSync('ssl/server.key'),
    cert : fs.readFileSync('ssl/server.crt')
};

https.createServer(options, function(req, res) {
    res.writeHead(200);
    res.end('Hello Secure World');
}).listen(8080);
