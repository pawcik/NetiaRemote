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
chrome.socket.create('udp', null, function(createInfo) {
    clientSocket = createInfo.socketId;

    chrome.socket.connect(clientSocket, '239.255.255.250', 1900, function(result) {
        console.log('connect result = ' + result.toString());
    });

    // We are now connected to the socket so send it some data
    chrome.socket.write(clientSocket, str2ab('M-SEARCH * HTTP/1.1\r\nHOST: 239.255.255.250:1900\r\nST: urn:netgem:RemoteControlServer:1\r\nMAN: \"ssdp:discover\"\r\nMX: 3\r\n'), function(writeInfo) {
         console.log("writeInfo = " + writeInfo.bytesWritten);
    });

    chrome.socket.read(clientSocket, 1900, function(readInfo) {
        console.log('Client: recived response: ' + ab2str(readInfo.data));
    });
});


// Server
chrome.socket.create('udp', null, function(createInfo){
    serverSocket = createInfo.socketId;

    chrome.socket.bind(serverSocket, '0.0.0.0', 1900, function(result){
        console.log('chrome.socket.bind: result = ' + result.toString());
    });

    chrome.socket.joinGroup(serverSocket, '239.255.255.250', function(result) {
        console.log('chrome.socket.join: result = ' + result.toString());
    });

    function read()
    {
        chrome.socket.recvFrom(serverSocket, 1024, function(recvFromInfo){
            console.log('Server: recvFromInfo: ', recvFromInfo, 'Message: ', 
                ab2str(recvFromInfo.data));
            if(recvFromInfo.resultCode >= 0)
            {
                chrome.socket.sendTo(serverSocket, 
                    str2ab('Received message from client ' + recvFromInfo.address + 
                    ':' + recvFromInfo.port.toString() + ': ' + 
                    ab2str(recvFromInfo.data)), 
                    recvFromInfo.address, recvFromInfo.port, function(){});
                read();
            }
            else
                console.error('Server read error!');
        });
    }

    read();
});
