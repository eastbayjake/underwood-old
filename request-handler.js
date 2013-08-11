var path = require('path');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var url = require('url');
var fs = require('fs');

module.exports.handleRequest = function (req, res) {

  var statusCode = 200;
  var defaultCorsHeaders = {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "Origin, Content-Type, Accept",
    "access-control-max-age": 10 // Seconds.
  };
  var html, styles, js, sort;

  // var parseURL = function(url) {
  //   return url.substr(0,8);
  // };

  // var searchURL = function(url) {
  //   return url.substr(9, url.length);
  // };

  if (req.url === '/') {
    html = fs.readFileSync(path.join(__dirname, 'index.html'));
    defaultCorsHeaders["Content-Type"] = "text/html";
    res.writeHead(statusCode, defaultCorsHeaders);
    res.write(html);
    res.end();
  }

  else if (req.url === '/css/styles.css') {
    styles = fs.readFileSync(path.join(__dirname, 'css/styles.css'));
    defaultCorsHeaders["Content-Type"] = "text/css";
    res.writeHead(statusCode, defaultCorsHeaders);
    res.write(styles);
    res.end();
  }

  else if (req.url === '/js/main.js') {
    js = fs.readFileSync(path.join(__dirname, 'js/main.js'));
    defaultCorsHeaders["Content-Type"] = "text/javascript";
    res.writeHead(statusCode, defaultCorsHeaders);
    res.write(js);
    res.end();
  }

  else if (req.url === '/js/sortable.js') {
    sort = fs.readFileSync(path.join(__dirname, 'js/sortable.js'));
    defaultCorsHeaders["Content-Type"] = "text/javascript";
    res.writeHead(statusCode, defaultCorsHeaders);
    res.write(sort);
    res.end();
  }

  else {
    res.writeHead(404, defaultCorsHeaders);
    res.write("File not found");
    res.end();
  }

  // if(parseURL(req.url) === '/js/main.js') {
  //   if (req.method === 'GET') {
  //     var siteHTML = fs.readFileSync(path.join(__dirname, '../data/sites/'+searchURL(req.url)));
  //     res.writeHead(statusCode, defaultCorsHeaders);
  //     res.end(siteHTML);
  //   } else if (req.method === 'POST') {
  //     req.on('data', function(data) {
  //       fs.appendFile(path.join(__dirname, '../data/sites.txt'), '\n'+data);
  //     });
  //     res.writeHead(302, defaultCorsHeaders);
  //     res.end();
  //   } else {
  //     res.writeHead(406, defaultCorsHeaders);
  //     res.end();
  //   }
  // }

};