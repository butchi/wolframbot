var http = require('http');
var server = http.createServer();
var qs = require('querystring');
server.on('request', (req, res) => {
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write('Thanks, world!');
  res.end();
});
server.listen(1337, '169.254.34.166');
console.log('server listening ...');
