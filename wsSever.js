/*
var ws = require('nodejs-websocket');

var server = ws.createServer(function (conn) {
    conn.on('text',function (str) {
        console.log('接受'+str);
        conn.sendText(str.toUpperCase()+'!!!');
    })
    conn.on('close',function (code,reason) {
        console.log('链接结束');
    })
}).listen(8001);*/

/*var ws = require("nodejs-websocket");
var port = 8001;

var clientCount = 0 ;

// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection");
    clientCount++;
    conn.nickname = 'mm'+clientCount;

    var mess = {};
    mess.type = 'enter';
    mess.data = conn.nickname+'comming';
    broadcast(JSON.stringify(mess));

    conn.on("text", function (str) {
        console.log("Received "+str);
        var mess = {};
        mess.type = 'message';
        mess.data = str;
        broadcast(JSON.stringify(mess));
        // conn.sendText(str.toUpperCase()+"!!!")
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
        var mess = {};
        mess.type = 'leaving';
        mess.data = conn.nickname+'leving';
        broadcast(JSON.stringify(mess));
    });
    conn.on('error',function (err) {
        console.log(err);
    })
}).listen(port);

function broadcast(str) {
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}*/

var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(3000);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
