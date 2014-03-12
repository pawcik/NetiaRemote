
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
$("button#next").bind("click", function(e){
    controller.next();
})
$("button#prev").bind("click", function(e){
    controller.prev();
})
$("button#channelUp").bind("click", function(e){
    controller.channelUp();
})
$("button#channelDown").bind("click", function(e){
    controller.channelDown();
})
