"use strict";
/*
 * Created by jiayanguo on 8/7/16.
 */
const chatServer = require('./lib/chat_server');
const mime = require('mime');
const path = require('path');
const fs = require('fs');
const http = require('http');
const cache = {};

const send404 = (response) => {
    response.writeHead(404, {'Content-Type':'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
};

const sendFile = (response, filePath, fileContents) => {
    response.writeHead(
        200,
        {'content-type': mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
};

const serveStatic = (response, cache, absPath) => {
    if (cache[absPath]) {
        sendFile(response, absPath, cache[absPath]);
    }else {
        fs.exists(absPath, (exist) => {
         if (exist) {
             fs.readFile(absPath, (err, data) => {
                 if(err) {
                     send404(response);
                 }else {
                     cache[absPath] = data;
                     sendFile(response, absPath, data);
                 }
             });
         }  else {
             send404(response);
         };
        });
    };
};


const server = http.createServer((request, response) => {
    let filePath ;

    if (request.url == '/') {
        filePath = 'public/index.html';
    }else {
        filePath = 'public' +request.url;
    };

    let absPath = './' + filePath;
    serveStatic (response, cache, absPath);
});

server.listen(3000, () => {
    console.log("server listening on port 3000.");
});
chatServer.listen(server);
