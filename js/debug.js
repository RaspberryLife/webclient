// Initialize ProtoBuf.js
var ProtoBuf = dcodeIO.ProtoBuf;
var RBLMessage = ProtoBuf.loadProtoFile("raspberrylife.proto")
    .build("RBLMessage");
var currentTime;
var plainText = document.getElementById("plainText");
var type = document.getElementById("type");
var tID = document.getElementById("tID");
var func = document.getElementById("func");
var param = document.getElementById("param");
var clientID = "webclient1";
var log = document.getElementById("log");
var message;
var modulID;
var modulType;
var modulValue;
var startDateTime;
var endDateTime;
var testFloat1;
var socket = "";

// Default socket IP
var socketIP = "localhost";

// Connect to websocket
function createWebSocket() {
    socketIP = document.getElementById("socketIP")
        .value;
    socket = new WebSocket("ws://" + socketIP + ":6680/websocket-echo");
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
            modulID = message.dataSet.modulID;
            modulType = message.dataSet.fieldID;
            modulValue = message.dataSet.count;
            startDateTime = message.dataSet.startDateTime;
            endDateTime = message.dataSet.endDateTime;
            testFloat1 = message.dataSet.data;
            appendToLog("Modul: " + modulID);
            appendToLog("Einheit: " + modulType);
            appendToLog("Wert: " + modulValue);
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

function getModulID() {
    appendToLog("MODUL ID: " + modulID);
    return modulID;
}

// Send protobuf message
function send() {
    if (socket.readyState === WebSocket.OPEN) {
        message = new RBLMessage(clientID, RBLMessage.MessageType.PLAIN_TEXT, 0, new RBLMessage.PlainText(plainText.value));
        socket.send(message.toArrayBuffer());
        appendToLog("Message sent: " + message.plainText.text);
        //socket.onmessage();
    } else {
        appendToLog("Not connected");
    }
}

function sendGetDataMessage() {
    if (socket.readyState === WebSocket.OPEN) {
        var message = new RBLMessage(clientID, RBLMessage.MessageType.GET_DATA_SET, 0, new RBLMessage.GetDataSet(
            "livingrooom_sensormodule", "temp", 20, "bla", "bla2"));
        socket.send(message.toArrayBuffer());
        appendToLog("Get Data Request sent");
    } else {
        appendToLog("Not connected");
    }
}

function sendInstructionMessage() {
    if (socket.readyState === WebSocket.OPEN) {
        type = document.getElementById("type").value;
        tID = document.getElementById("tID").value;
        func = document.getElementById("func").value;
        param = document.getElementById("param").value;

        var mt = RBLMessage.ModelType.MODULE_TEMP;
        switch (type){
            case 1:
            mt = RBLMessage.ModelType.MODULE_TEMP;
            break;
            case 2:
            mt = RBLMessage.ModelType.MODULE_OUTLET;
            break;
                      }
        var intParams = [];
        intParams.push(param);

        var message = new RBLMessage({
            "id": "clientID",
            "mType": "RUN_INSTRUCTION",
            "messageNumber": "123",
            "runInstruction": {
                "modeltype": type,
                "targetModulID": tID,
                "instruction": {
                    "instructionID": "3",
                    "intParameters": intParams
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
        var message = new RBLMessage(clientID, RBLMessage.MessageType.AUTH_REQUEST, 0, new RBLMessage.PlainText("abc12345"));
        socket.send(message.toArrayBuffer());
        appendToLog("Authentication Request Sent");
    } else {
        appendToLog("Not connected");
    }
}

// Append message to logS
function appendToLog(logmsg) {
log.value += getCurrentTime() + "> " + logmsg + "\n";
}

// Clear log on reload
log.value = "";
