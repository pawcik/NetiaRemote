test("has sendAction function for each action", function() {
  var controller = new NetiaController("", 0)
  ok(controller.sendAction, "sendAction must be defined")
})

test("has sendKey* function for each action", function() {
  var controller = new NetiaController("", 0)
  ok(controller.sendKey0, "sendKey0 must be defined" );
  ok(controller.sendKeyBack, "sendKeyBack must be defined" );
  ok(controller.sendKeyUp, "sendKeyUp must be defined" );
});
