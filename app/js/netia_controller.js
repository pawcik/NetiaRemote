var NetiaController;

(function() {

    var target = function(host, port) {
        return 'http://' + host + ':' + port + '/remote.control';
    }

    function sendKeyAction(data) {
        return '<action name=\"send_key\">' + data + '</action>';
    }

    NetiaController = function(host, port) {
        this.host = host;
        this.port = port;
    }

    NetiaController.prototype.sendAction = function(value) {
        $.ajaxSetup({contentType: "text/xml"})
        $.post( target(this.host, this.port), sendKeyAction(value), function(data) {
            console.log(data.documentElement);
        });
    }

    NetiaController.prototype.volumeUp = function() {
        this.sendAction('volume_up');
    }
    NetiaController.prototype.volumeDown = function() {
        this.sendAction('volume_down');
    }

}());
