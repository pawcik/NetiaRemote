var host = document.getElementById("host");
host.addEventListener('keydown', function() {
    localStorage["host"] = this.value;
});

var port = document.getElementById("port");
port.addEventListener('keydown', function() {
    localStorage["port"] = this.value;
});

// Restores select box state to saved value from localStorage.
host.value = localStorage["host"];
port.value = localStorage["port"];

