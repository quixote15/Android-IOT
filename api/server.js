const port = 3000;
var express = require('express'); //get an express instance
var server = express(); //expres api object
var five = require('johnny-five');
var httpServer = require("http").createServer(server);  
var io=require('socket.io')(httpServer);
cors = require('cors');

server.listen(port); //make serve listen to port 3000

server.use(express.static(__dirname + '/public')); //__dirname ??
server.use(cors({credentials: true, origin: 'http://localhost:4000'}));

server.get('/', function(req, res) {  
        res.send("Connected");
});


var led;

var board = new five.Board({port: "COM3"});
//Johnny five arduino led config
board.on("ready",function(){
    console.log('Arduino connected');
    led = new five.Led(12);
    led.on();
});


//
io.set('transports',['xhr-polling']); //what the fu$#$ is that ?
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

//https://www.postscapes.com/javascript-and-the-internet-of-things/
//http://blog.ricardofilipe.com/post/getting-started-arduino-johhny-five
//http://gabrielfeitosa.com/socketio-angularjs-comunicacao-realtime/