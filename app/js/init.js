var d = new Discovery();
var controller;
var devicesDiv = $('output .devices')

var initialize = function(device) {
    var button = function(id, p, cb) {
        var b = $('<button/>', { text: id, click: cb });
        p.append(b);
    }
    devicesDiv.empty();
    button(device.host + ':' + device.port, devicesDiv, function() {
        chrome.permissions.request({ origins: ['http://'+device.host+'/']}, function(granted) {
            if ( granted) {
                controller = new NetiaController(device.host, device.port);
                var commands = $("output .controller");
                commands.empty();
                commands.append("<strong>Actions:</strong><br/>");
                fillActions(commands, controller);
            } else {
                console.log(chrome.runtime.lastError);
                console.log('sadly :(');
                    }
        });
    });
devicesDiv.append("<br/>");
}
$("button#discovery").bind("click", function(e){
    devicesDiv.empty();
    devicesDiv.append(getLoadingImage());
    d.start(initialize);
})

$("button#custom_controller").bind("click", function(e){
    var host = $("input#host").val();
    var port = $("input#port").val();
    initialize( {host: host, port: port});
})


var fillActions = function(div, controller) {
    for (var action in controller) {
        if (action.indexOf("sendKey") == 0 ) {
            div.append('<button id="' + action + '">' + action + '</button>');
            div.find("button#"+action).bind("click", getActionClickHandler(action))
        }
    }
}

var getActionClickHandler = function (action) {
  return function () { controller[action]() }
} 

var getLoadingImage = function() {
    return '<img src="/img/loading.gif" alt="activity indicator"/>';
}
