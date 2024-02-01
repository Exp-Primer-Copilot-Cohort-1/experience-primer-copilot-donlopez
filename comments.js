// create web server
// 1. Load http module
var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');

http.createServer(function(request, response) {
  var urlPath = url.parse(request.url).pathname;
  console.log(urlPath);
  if (urlPath === '/comments') {
    if (request.method === 'POST') {
      var body = '';
      request.on('data', function(data) {
        body += data;
      });
      request.on('end', function() {
        var comment = JSON.parse(body);
        comments.add(comment);
        response.writeHead(200, {
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        });
        response.end('Comment added');
      });
    } else if (request.method === 'GET') {
      var allComments = comments.getAll();
      var allCommentsStr = JSON.stringify(allComments);
      response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      response.end(allCommentsStr);
    }
  } else {
    var filePath = '.' + urlPath;
    if (filePath === './') {
      filePath = './index.html';
    }
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
      case '.js':
        contentType = 'text/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
    }
    fs.exists(filePath, function(exists) {
      if (exists) {
        fs.readFile(filePath, function(error, content) {
          if (error) {
            response.writeHead(500);
            response.end();
          } else {
            response.writeHead(200, {
              'Content-Type': contentType
            });
            response.end(content, 'utf-8');
          }
        });
      } else {
        response.writeHead(404);
        response.end();
      }
    });
  }
}).listen(8080);
console.log('Server running at http://');
