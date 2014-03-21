var NetiaController;

(function() {

    var that = this;

    var getTargetAddress = function(host, port) {
        return 'http://' + host + ':' + port + '/remote.control';
    }

    var getSendActionCommand = function(data) {
        return '<action name=\"send_key\">' + data + '</action>';
    }

    function toCammelCase(string) {
        return string.replace(/[-_](.)/g, function(match, gr1) { 
            return gr1.toUpperCase(); 
        });
    }

    var actions = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "back",
        "blue",
        "delete",
        "fullscreen",
        "green",
        "menu",
        "mute",
        "next",
        "on_off",
        "play_pause",
        "prev",
        "rec",
        "red",
        "volume_down",
        "volume_up",
        "yellow",
        "channel_up",
        "channel_down",
        "ok",
        "left",
        "right",
        "up",
        "down"
        ];

    NetiaController = function(host, port) {
        this.host = host;
        this.port = port;
    }

    NetiaController.prototype.sendAction = function(value) {
        $.ajaxSetup({contentType: "text/xml"})
        $.post( getTargetAddress(this.host, this.port), getSendActionCommand(value), function(data) {
            console.log(data.documentElement);
        });
    }

    for(var i = 0; i < actions.length; i++) {
        NetiaController.prototype[toCammelCase("sendKey_" + actions[i])] = (function (index) {
            return function () {
                this.sendAction(index.action);
            };
        })({'action': actions[i]});
    }

}());
