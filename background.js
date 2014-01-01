var getHost = function() {
    return localStorage["host"] + ":" + localStorage["port"];
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      doAjax("http://" + getHost() + "/remote.control", request, function(res) {
          sendResponse({status: res});
          console.log(res);
      });
  });

function doAjax(url, data, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            callback(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("Content-Type", "text/xml");
    xmlhttp.send("<action name=\"send_key\">" + data + "</action>");
}
