angular.module('myApp',['btford.socket-io'])
.factory('mySocket', function (socketFactory) {
        return socketFactory();
    }).
    controller('ArduController', function (mySocket) {
        var vm = this;
        
        vm.ledOn = function () {
 
            mySocket.emit('led:on');
            console.log('LED ON');
        };
 
 
        vm.ledOff = function () {
 
            mySocket.emit('led:off');
            console.log('LED OFF');  
        };    
});