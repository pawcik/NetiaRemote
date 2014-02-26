
var d = new Discovery();
$("button#root").bind("click", function(e){
  d.start(function(data) {
      $("output .controller").append(data).append("<br/>");
  });
})
