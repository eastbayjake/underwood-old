var http = require("http");
var handler = require("./request-handler.js");

var port = 8081;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
