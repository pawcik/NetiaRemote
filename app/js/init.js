
var d = new Discovery();
var controller;
$("button#discovery").bind("click", function(e){
  d.start(function(data) {
      $("output .progress").append(data.host).append("<br/>");
      controller = new NetiaController(data.host, data.port);
      fillActions($("output .controller"), controller);
  });
})

$("button#custom_controller").bind("click", function(e){
    var host = $("input#host").val();
    var port = $("input#port").val();
    controller = new NetiaController(host, port);
    $("output .progress").append(host + ":" + port).append("<br/>");
    fillActions($("output .controller"), controller);
})


var fillActions = function(div, controller) {
    var that = this;
    div.empty();
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
