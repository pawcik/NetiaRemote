var Discovery;

(function(){
    Discovery = function(){}

    var parse = function(data) {
        var arr = data.replace(/\r\n|\r/g, "\n").split("\n"), ret = {};

        for(var i = 0, l = arr.length; i < l; i++ ) {
            var a = arr[i].split(":");
            var k = a[0].toLowerCase();
            var v = a.slice(1).join(":").replace(/^\s*/, "");

            if(k === "location") {
                url = document.createElement('a');
                url.href = v;
                ret['host'] = url.hostname;
                ret['port'] = url.port;
            }

            if(!!v) {
                ret[k] = v;
            }
        }
        return ret;
    }

    Discovery.prototype.start = function(callback) {
        var upnp = new Upnp();
        var self = this;
        upnp.onready = function() {
            upnp.search('urn:netgem:RemoteControlServer:1', function(data) {
                console.log(data);
                device = parse(data);
                callback(device);
            });
        }
    }

}())


var Upnp;
(function() {
    /** Utils */
    // From https://developer.chrome.com/trunk/apps/app_hardware.html
    var str2ab = function(str) {
        var buf=new ArrayBuffer(str.length);
        var bufView=new Uint8Array(buf);
        for (var i=0; i<str.length; i++) {
            bufView[i]=str.charCodeAt(i);
        }
        return buf;
    }

    // From https://developer.chrome.com/trunk/apps/app_hardware.html
    var ab2str = function(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    };

  // SSDP definitions
    var M_SEARCH_REQUEST = "M-SEARCH * HTTP/1.1\r\n" +
       "HOST: 239.255.255.250:1900\r\n" +
       "ST: {{st}}\r\n" +
       "MAN: \"ssdp:discover\"\r\n" +
       "MX: 3\r\n"

    var socket = chrome.socket;

    Upnp = function() {
        this.sid = null;
        this.MIP = '239.255.255.250';
        this.PORT = 1900;
        var self = this;
        socket.create('udp', {}, function(socketInfo) {
            self.sid = socketInfo.socketId;
            socket.bind(self.sid, '0.0.0.0', 0, function(res) {
                if(res !== 0) {
                    throw('cannot bind socket');
                }
                self.onready();
            });
        });
    }

    Upnp.prototype.onready = function () {
        console.log('im ready to do action');
    }

    Upnp.prototype.search = function (st, callback) {
       socket.recvFrom(this.sid, function(recv) {
           callback(ab2str(recv.data));
       });

       var ssdp = M_SEARCH_REQUEST.replace("{{st}}", st);
       socket.sendTo(this.sid, str2ab(ssdp), this.MIP, this.PORT, function(e) {
           //TODO: make sure all bytes were sent
           console.log('byte writeen: ' + e.bytesWritten);
       });
    }
}())
