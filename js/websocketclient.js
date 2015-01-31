/*global document*/

// Initialize ProtoBuf.js
var dcodeIO;
var RBLMessage = dcodeIO.ProtoBuf.loadProtoFile("proto/raspberrylife.proto").build("RBLMessage");
var WebSocket;
var socket;
var clientID = "webclient v0.8";
var socketIP = "localhost";

createWebSocket(socketIP);

// Connect to websocket
function createWebSocket(socketIP) {
	socket = new WebSocket("ws://" + socketIP + ":6680/websocket-echo");
	socket.binaryType = "arraybuffer";

	socket.onopen = function () {
		console.log("Websocket: connecting..");
		wsSendAuthRequestMessage();
		console.log("Websocket: connected");
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

function wsSendLogicMessage() {
	if (socket.readyState === WebSocket.OPEN) {
		var message = buildLogicMessage();
		console.log("Websocket: Sending Message: " + JSON.stringify(message));
		socket.send(message.toArrayBuffer());
		console.log("Websocket: Logic Message Sent");
	} else {
			console.log("Websocket: not connected");
		}
	}
