const port = 3000;
var express = require('express'); //get an express instance
var server = express(); //expres api object
var five = require('johnny-five');
var httpServer = require("http").createServer(server);  
var io=require('socket.io')(httpServer);

server.listen(port); //make serve listen to port 3000

server.use(express.static(__dirname + '/public')); //__dirname ??
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next() //middleware wont send a response so call next middleware
});

server.get('/', function(req, res) {  
        res.send("Connected");
});


var led;

var board = new five.Board();
//Johnny five arduino led config
board.on("ready",function(){
    console.log('Arduino connected');
    led = new five.Led(2);
});


//
io.on('connection',function(socket){
     console.log(socket.id);
 
        socket.on('led:on', function (data) {
           led.on();
           console.log('LED ON RECEIVED');
        });
 
        socket.on('led:off', function (data) {
            led.off();
            console.log('LED OFF RECEIVED');

        });

        console.log('Waiting for connection');
 
 
});