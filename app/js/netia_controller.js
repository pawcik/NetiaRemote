var NetiaController;

(function() {

    var that = this;

    var target = function(host, port) {
        return 'http://' + host + ':' + port + '/remote.control';
    }

    var sendKeyAction = function(data) {
        return '<action name=\"send_key\">' + data + '</action>';
    }

    function toCammelCase(string) {
        return string.replace(/[-_](.)/g, function(match, gr1) { 
            return gr1.toUpperCase(); 
        });
    }

    var actions = [
        "volume_up",
        "volume_down",
        "channel_up",
        "channel_down",
        "next",
        "prev"];

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

    for(var i = 0; i < actions.length; i++) {
        NetiaController.prototype[toCammelCase(actions[i])] = (function (action) {
            return function () {
                this.sendAction(action);
            }
        })(actions[i]);
    }

}());
