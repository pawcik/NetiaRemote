var ajax = function(action) {
  chrome.runtime.sendMessage(action, function(response) {
      console.log(response.status);
  });
}

var onClick = function() { ajax(this.dataset.action); }

document.getElementById('volume-up').addEventListener('click', onClick);
document.getElementById('volume-down').addEventListener('click', onClick);

