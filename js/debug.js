/*global document*/

// Initialize ProtoBuf.js
var dcodeIO;
var RBLMessage = dcodeIO.ProtoBuf.loadProtoFile("proto/raspberrylife.proto").build("RBLMessage");
var WebSocket;
var currentTime;
var socketIP = document.getElementById("socketIP");
var authKey = document.getElementById("authKey");
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
var clientID = "webclient v0.4";
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


// Default socket IP
//var socketIP = "localhost";

// Connect to websocket
function createWebSocket() {
	socket = new WebSocket("ws://" + socketIP.value + ":6680/websocket-echo");
	socket.binaryType = "arraybuffer";

	socket.onopen = function () {
		appendToLog("Connected");
	};

	socket.onclose = function () {
		appendToLog("Disconnected");
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

			appendToLog("Message ID: " + messageID);
			appendToLog("Message Type: " + messageType);
			appendToLog("Message Flag: " + messageFlag);
			appendToLog("Field ID: " + fieldID);
			appendToLog("Data Type: " + dataType);
			appendToLog("String Data: " + stringData);
			appendToLog("Int32 Data: " + int32Data);
			appendToLog("Float Data: " + floatData);
			appendToLog("Datum von: " + startDateTime);
			appendToLog("Datum bis: " + endDateTime);
			appendToLog("Object type: " + Object.prototype.toString.call(testFloat1));
			appendToLog("data array length: " + testFloat1.length);
		} catch (err) {
			appendToLog("Error: " + err);
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

		appendToLog("Message: " + JSON.stringify(message));

		socket.send(message.toArrayBuffer());
		appendToLog("Message sent: " + message.plainText.text);
	} else {
		appendToLog("Not connected");
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
		appendToLog("Get Data Request sent");
	} else {
		appendToLog("Not connected");
	}
}

function sendInstructionMessage() {
	if (socket.readyState === WebSocket.OPEN) {

		var msgType = "RUN_INSTRUCTION";
		var msgFlag = "REQUEST";
		var msgNumber = "53";
		var actType = actuatorType2.value;
		var actID = actuator2.value;
		var insId = instructionID.value;
		var params = parameters.value;
		var	modType = moduleType.value;
		var	modId = moduleID.value;

		var message = buildRunInstructionMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, insId, params, modType, modId)

				appendToLog("Message: " + JSON.stringify(message));

				socket.send(message.toArrayBuffer());
				appendToLog("Instruction sent");
			} else {
				appendToLog("Not connected");
			}
		}

		// Send authentication request
		function sendAuthRequestMessage() {
			if (socket.readyState == WebSocket.OPEN) {
				var msgType = "AUTH";
				var msgFlag = "REQUEST";
				var msgNumber = "50";
				var plainTextValue = authKey.value;

				var message = buildPlainTextMessage(clientID, msgType, msgFlag, msgNumber, plainTextValue);

				appendToLog("Message: " + JSON.stringify(message));


				socket.send(message.toArrayBuffer());
				appendToLog("Authentication Request Sent");
			} else {
				appendToLog("Not connected");
			}
		}

		// Append message to log
		function appendToLog(logmsg) {
			log.value += getCurrentTime() + "> " + logmsg + "\n";
			log.scrollTop = log.scrollHeight;
		}

		// Clear log on reload
		log.value = "";
