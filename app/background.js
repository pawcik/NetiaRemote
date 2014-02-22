chrome.app.runtime.onLaunched.addListener(function() {
    //chrome.app.window.create('window.html', {
        //'bounds': {
            //'width': 400,
            //'height': 500
        //}
    //});
  });

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var str2ab=function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  return buf;
}

// From https://developer.chrome.com/trunk/apps/app_hardware.html
var ab2str=function(buf) {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
};

// Create the Socket
chrome.socket.create('udp', {}, function(socketInto) {
    clientSocket = socketInto.socketId;


    chrome.socket.bind(clientSocket, '0.0.0.0', 0, function(result){
        if (result !== 0) {
            throw('cannot bind socket')
        }
        console.log('chrome.socket.bind: result = ' + result.toString());
    });




    if (!!clientSocket === false) {
        throw('socket id is not allocated')
    }

    chrome.socket.recvFrom(clientSocket, function(recv) {
        console.log('recv data: ' + ab2str(recv.data) )

    });

    var MSEARCH = 'M-SEARCH * HTTP/1.1\r\nHOST: 239.255.255.250:1900\r\nST: urn:netgem:RemoteControlServer:1\r\nMAN: \"ssdp:discover\"\r\nMX: 3\r\n'
    chrome.socket.sendTo(clientSocket, str2ab(MSEARCH), '239.255.255.250', 1900, function(e) {
        console.log('byte written = ' + e.bytesWritten)
    });

});

