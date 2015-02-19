/*global document*/

// Initialize ProtoBuf.js
var dcodeIO;
var RBLMessage = dcodeIO.ProtoBuf.loadProtoFile("proto/raspberrylife.proto").build("RBLMessage");
var WebSocket;
var currentTime;
var plainText = document.getElementById("plainText");
var actuator = document.getElementById("actuator");
var actuator2 = document.getElementById("actuator2");
var actuatorType = document.getElementById("actuatorType");
var actuatorType2 = document.getElementById("actuatorType2");
var instructionID = document.getElementById("instructionId");
var moduleType = document.getElementById("moduleType");
var moduleID = document.getElementById("moduleID");
var parameters = document.getElementById("parameters");
var field = document.getElementById("field");
var count = document.getElementById("count");
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var clientID = "webclient v1.0";
var log = document.getElementById("log");
var messageID;
var messageType;
var messageFlag;
var fieldID;
var dataType;
var stringData;
var int32Data;
var floatData;
var startDateTime;
var endDateTime;
var testFloat1;
var socket;


// Connect to websocket
function createWebSocket(socketIP) {
	socket = new WebSocket("ws://" + socketIP + ":6680/websocket-echo");
	socket.binaryType = "arraybuffer";

	socket.onopen = function () {
		console.log("Connected");
	};

	socket.onclose = function () {
		console.log("Disconnected");
	};

	socket.onmessage = function (message) {
		try {
			// Decode the Message
			message = RBLMessage.decode(message.data);
			messageID = message.id;
			messageType = message.messageType;
			messageFlag = message.messageFlag;
			fieldID = message.data.fieldId;
			dataType = message.data.dataType;
			stringData = message.data.stringData;
			int32Data = message.data.int32Data;
			floatData = message.data.floatData;
			startDateTime = message.data.startDateTime;
			endDateTime = message.data.endDateTime;
			testFloat1 = message.data.data;

		} catch (err) {
			console.error("Error: " + err);
		}
	};
}

function getCurrentTime() {
	var date = new Date();
	currentTime = date.toLocaleTimeString() + " ";
	return currentTime;
}

// Send protobuf plainText message
function sendPlainTextMessage() {
	if (socket.readyState === WebSocket.OPEN) {
		var msgType = "PLAIN_TEXT";
		var msgFlag = "REQUEST";
		var msgNumber = "51";
		var plainTextValue = plainText.value;

		var message = buildPlainTextMessage(clientID, msgType, msgFlag, msgNumber, plainTextValue);
		
		socket.send(message.toArrayBuffer());
	}
}

function sendGetDataMessage() {
	if (socket.readyState === WebSocket.OPEN) {
		var msgType = "DATASET";
		var msgFlag = "REQUEST";
		var msgNumber = "52";
		var actType = actuatorType.value;
		var actID = actuator.value;
		var fieldID = field.value;

		var message = buildGetDataMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, fieldID);

		socket.send(message.toArrayBuffer());
	} 
}

function sendInstructionMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, insId, params, modType, modId) {
	if (socket.readyState === WebSocket.OPEN) {

		var message = buildRunInstructionMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, insId, params, modType, modId);

				socket.send(message.toArrayBuffer());
			}
		}

// Send authentication request
function sendAuthRequestMessage(authKey) {
	if (socket.readyState == WebSocket.OPEN) {
		var clientID = "webclient v0.6";
		var msgType = "AUTH";
		var msgFlag = "REQUEST";
		var msgNumber = "50";
		var plainTextValue = authKey;
		
		console.log("AAAAAAAAAAAAA");

		var message = buildPlainTextMessage(clientID, msgType, msgFlag, msgNumber, plainTextValue);

		socket.send(message.toArrayBuffer());
	} 
}


