
var d = new Discovery();
var controller;
$("button#root").bind("click", function(e){
  d.start(function(data) {
      $("output .controller").append(data.host).append("<br/>");
      controller = new NetiaController(data.host, data.port);
  });
})

$("button#volumeUp").bind("click", function(e){
    controller.volumeUp();
})
$("button#volumeDown").bind("click", function(e){
    controller.volumeDown();
})
