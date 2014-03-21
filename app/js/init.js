
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
    document.getElementsByClassName("controller")[0].onclick = function(e) {
        that.controller[e.srcElement.getAttribute('id')]();
    };
    for (var action in controller) {
        if (action.indexOf("sendKey") == 0 ) {
            div.append('<button id="' + action + '">' + action + '</button>');
            //TODO: why this is not working ??? ask guru, hm ... grze do you know ?
            //div.find("button#"+action).bind("click", function(e) { controller[action](); })
        }
    }
}
