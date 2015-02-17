/*global document*/

// Initialize ProtoBuf.js
var dcodeIO;
var RBLMessage = dcodeIO.ProtoBuf.loadProtoFile("proto/raspberrylife.proto").build("RBLMessage");
var WebSocket;
var socket;
var clientID = "webclient v0.9";
var socketIP = "localhost";

var exeType = document.getElementById("exeType");
var exeReq = document.getElementById("exeReq");
var initType = document.getElementById("initType");
var initId = document.getElementById("initId");
var conFieldId = document.getElementById("conFieldId");
var conState = document.getElementById("conState");
var recType = document.getElementById("recType");
var recId = document.getElementById("recId");
var insId = document.getElementById("insId");
var params = document.getElementById("params");
var modType = document.getElementById("modType");
var modId = document.getElementById("modId");



createWebSocket(socketIP);

// Connect to websocket
function createWebSocket(socketIP) {
	socket = new WebSocket("ws://" + socketIP + ":6680/websocket-echo");
	socket.binaryType = "arraybuffer";

	socket.onopen = function () {
		console.log("Websocket: connecting..");
		wsSendAuthRequestMessage();
		console.log("Websocket: connected");
		wsSendUserMessage();
	};

	socket.onclose = function () {
	};
}

// Send authentication request
function wsSendAuthRequestMessage() {
	if (socket.readyState == WebSocket.OPEN) {
		var msgType = "AUTH";
		var msgFlag = "REQUEST";
		var msgNumber = "50";
		var plainTextValue = "abc12345";
		var message = buildPlainTextMessage(clientID, msgType, msgFlag, msgNumber, plainTextValue);
		socket.send(message.toArrayBuffer());
	} else {
			console.log("Websocket: not connected");
	}
}

function wsSendUserMessage() {
	if (socket.readyState == WebSocket.OPEN) {
		var msgType = "USER";
		var msgFlag = "REQUEST";
		var msgNumber = "51";
		var plainTextValue1 = $.cookie('email');
		var plainTextValue2 = $.cookie('password');
		var message = buildPlainTextMessage2(clientID, msgType, msgFlag, msgNumber, plainTextValue1, plainTextValue2);
		socket.send(message.toArrayBuffer());
	} else {
			console.log("Websocket: not connected");
	}
}

function wsSendDataSetMessage() {
	if (socket.readyState == WebSocket.OPEN) {
		var msgType = "DATASET";
		var msgFlag = "REQUEST";
		var msgNumber = "52";
		var crudType = "RETRIEVE";
		var dataType = "MODULE_LIST";
		var message = buildDataSetMessage(clientID, msgType, msgFlag, msgNumber, crudType, dataType);
		socket.send(message.toArrayBuffer());
	} else {
			console.log("Websocket: not connected");
	}
}

function wsSendLogicMessage(logicName, initId, modType, conFieldId, conState, recId, modType) {
	if (socket.readyState === WebSocket.OPEN) {
		var msgType = "LOGIC";
		var msgFlag = "REQUEST";
		var msgNumber = "623";
		var crudType = "CREATE";
		var logicId = "124";
		var message = buildLogicMessage(clientID, msgType, msgFlag, msgNumber, crudType, logicId, logicName, exeType, exeReq, initType, initId, conFieldId, conState, recType, recId, insId, params, modType, modId);
		console.log("Websocket: Sending Message: " + JSON.stringify(message));
		socket.send(message.toArrayBuffer());
		console.log(initType);
		console.log("Websocket: Logic Message Sent");
	} else {
			console.log("Websocket: not connected");
		}
	}
