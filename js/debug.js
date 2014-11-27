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
var intParam = document.getElementById("intParam");
var field = document.getElementById("field");
var count = document.getElementById("count");
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var clientID = "webclient v0.2";
var log = document.getElementById("log");
var message;
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
		message = new RBLMessage({
			"id": clientID,
			"messageType": "PLAIN_TEXT",
			"messageFlag": "REQUEST",
			"messageNumber": "1337",
			"plainText": {
				"text": plainText.value
			}
		});

		socket.send(message.toArrayBuffer());
		appendToLog("Message sent: " + message.plainText.text);
	} else {
		appendToLog("Not connected");
	}
}

function sendGetDataMessage() {
	if (socket.readyState === WebSocket.OPEN) {
		message = new RBLMessage({
			"id": clientID,
			"messageType": "GET_DATA",
			"messageFlag": "REQUEST",
			"messageNumber": "1337",
			"getData": {
				"actuator": {
					"actuatorType": actuatorType.value,
					"actuatorId": actuator.value
				},
				"fieldId": field.value,
				"range": {
					"count": count.value,
					"startDateTime": startDate.value,
					"endDateTime": endDate.value
				}
			}
		});

		socket.send(message.toArrayBuffer());
		appendToLog("Get Data Request sent");
	} else {
		appendToLog("Not connected");
	}
}

function sendInstructionMessage() {
	if (socket.readyState === WebSocket.OPEN) {
				var intParams = [];
				intParams.push(intParam.value);
				message = new RBLMessage({
					"id": clientID,
					"messageType": "RUN_INSTRUCTION",
					"messageFlag": "REQUEST",
					"messageNumber": "1337",
					"runInstruction": {
						"actuator": {
							"actuatorType": actuatorType2.value,
							"actuatorId": actuator2.value,
						},
						"instruction": {
							"instructionId": instructionID.value,
							"intParameters": intParams,
							"moduleType": moduleType.value,
							"moduleId": moduleID.value
						}
					}
				});

				socket.send(message.toArrayBuffer());
				appendToLog("Instruction sent");
			} else {
				appendToLog("Not connected");
			}
		}

		// Send authentication request
		function sendAuthRequestMessage() {
			if (socket.readyState == WebSocket.OPEN) {
				message = new RBLMessage({
					"id": clientID,
					"messageType": "AUTH",
					"messageFlag": "REQUEST",
					"messageNumber": "1337",
					"plainText": {
						"text": authKey.value
					}
				});

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
