var connection_status_text = $('#connection_status');

var checkConnection = function checkConnection() {
	console.log("Checking connection");
	if (socket.readyState === WebSocket.OPEN) {
		connection_status_text.html('OK');
	} else {
		connection_status_text.html('Not connected');
	}
};

function switchOn() {

	var clientID = "webclient v1.0";
	var msgType = "RUN_INSTRUCTION";
	var msgFlag = "REQUEST";
	var msgNumber = "53";
	var actType = "MODULE";
	var actID = "1";
	var insId = "1";
	var paramsstr = "1,1,4";
	var params = paramsstr.split(',');
	var modType = "MODULE_OUTLET";
	var modId = "1";

	sendInstructionMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, insId, params, modType, modId);
}

$(':input').change(function () {
	console.log($(this).data('module-name') + " is " + ($(this).prop('checked') ? 'on' : 'off'));

	if ($(this).prop('checked') == true) {
		switchOn();
	}

});

setInterval(function () {
		checkConnection();
	}
	, 3000);

createWebSocket("localhost");
sendAuthRequestMessage("abc12345");

//getListOfModules();
//load switches
