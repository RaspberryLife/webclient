$(document).ready(function () {

	function checkConnection() {
		var connectionStatus = $('#server_connected');
		if (socketIsOpen()) {
			connectionStatus.html('Connected');
		} else {
			connectionStatus.html('Not connected');
		}
	}

	createWebSocket('localhost');
	setInterval(function () {
		checkConnection();
	}, 3000);
});