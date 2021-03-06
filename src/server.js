var server = require("http");
var fs = require("fs");

var app = server.createServer(function (request, response) {
    var url = request.url;
    if(url.indexOf("public/assets") != -1){
        var type = null;
        url = url.substr(1 , url.length - 1);
        if(url.indexOf('css') != -1){
            type = 'text/css';
        }
        else if(url.indexOf('png') != -1){
            type = 'image/png';
        }
        readPageFile(response, url, type);
        return;
    }
    switch (url) {
        case "/":
            readPageFile(response, 'public/index.html', 'text/html');
            break;
        case '/play':
            readPageFile(response, 'public/play.html', 'text/html')
            break;
        case "/how-to-play":
            readPageFile(response, 'public/how-to-play.html', 'text/html');
            break;
        case "/documentation":
            readPageFile(response, 'public/documentation.html', 'text/html');
            break;
        case '/500':
            readPageFile(response, 'public/500.html', 'text/html');
            break;
        default:
            response.writeHead("404", { 'Content-Type': 'text/plain' })
            response.end("404 - Not Found");
    }
});

function readPageFile(response, filePath, contentType) {
    fs.readFile(filePath, function (error, data) {
        if (error) {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end("500 - Internal Server Error");
        }
        if (data) {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(data);
        }
    });
}

exports.listen = function (port) {
    app.listen(port, 'localhost');
}

exports.close = function (callback) {
    app.close(callback);
}