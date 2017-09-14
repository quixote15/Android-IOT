angular.module('myApp',['btford.socket-io'])
.factory('mySocket', function (socketFactory) {
        var ioSock = io.connect('http://localhost:3000');
        console.log(ioSock);
        var socket = socketFactory({
            ioSocket: ioSock
        });

        return socket;
    }).
    controller('ArduController', function (mySocket) {
        var vm = this;
        console.log(mySocket);
  
        vm.ledOn = function () {
 
            mySocket.emit('led:on');
            console.log(vm.socket);

        };
 
 
        vm.ledOff = function () {
 
            mySocket.emit('led:off');
            console.log('LED OFF');  
        };    
});