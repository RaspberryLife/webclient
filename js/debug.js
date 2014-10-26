 if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
            throw (new Error("ProtoBuf.js is not present."));
        }
         // Initialize ProtoBuf.js
        var ProtoBuf = dcodeIO.ProtoBuf;
        var RBHMessage = ProtoBuf.loadProtoFile("./raspberryhome.proto").build("RBHMessage");

    var id = document.getElementById("id");
    var mType = document.getElementById("mType");
    var plainText = document.getElementById("plainText");


     // Connect to websocket
    var socket = new WebSocket("ws://localhost:6680/websocket-echo");
    socket.binaryType = "arraybuffer";

    socket.onopen = function () {
        log.value += "> Connected\n";

    };

    socket.onclose = function () {
        log.value += "> Disconnected\n";
    };


    socket.onmessage = function (message) {
        try {
            // Decode the Message
            var message = RBHMessage.decode(message.data);
            modulID = message.dataSet.modulID;
            modulType = message.dataSet.fieldID;
            modulValue = message.dataSet.count;
            startDateTime = message.dataSet.startDateTime;
            endDateTime = message.dataSet.endDateTime;
            testFloat1 = message.dataSet.data;

            log.value += "> Modul: " + modulID + "\n";
            log.value += "> Einheit: " + modulType + "\n";
            log.value += "> Wert: " + modulValue + "\n";
            log.value += "> Datum von: " + startDateTime + "\n";
            log.value += "> Datum bis: " + endDateTime + "\n";
            log.value += "> Object type: " + Object.prototype.toString.call(testFloat1) + "\n";
            log.value += "> data array length: " + testFloat1.length + "\n";


        } catch (err) {
            log.value += "> Error: " + err + "\n";
        }
    }


    function getModulID() {
        log.value += "MODUL ID: " + modulID + "\n";
        return modulID;

    }


     // Send protobuf message
    function send() {
        if (socket.readyState == WebSocket.OPEN) {
            var message = new RBHMessage("testid", RBHMessage.MessageType.PLAIN_TEXT, new RBHMessage.PlainText(plainText.value));
            socket.send(message.toArrayBuffer());
            log.value += "> Message Sent: " + message.plainText.text + "\n";
            //socket.onmessage();
        } else {
            log.value += "> Not connected\n";
        }
    }


    function sendGetDataMessage() {
        if (socket.readyState == WebSocket.OPEN) {
            var message = new RBHMessage("getdata", RBHMessage.MessageType.GET_DATA_SET, new RBHMessage.GetDataSet("livingrooom_sensormodule", "temp", 20, "bla", "bla2"));


            socket.send(message.toArrayBuffer());

            log.value += "> Get Data Request Sent\n";
        } else {
            log.value += "> Not connected\n";
        }
    }

     // Send authentication request
    function sendAuthRequestMessage() {
        if (socket.readyState == WebSocket.OPEN) {
            var message = new RBHMessage("authrequest", RBHMessage.MessageType.AUTH_REQUEST, new RBHMessage.PlainText("abc12345"));
            socket.send(message.toArrayBuffer());
            log.value += "> Authentication Request Sent\n";
        } else {
            log.value += "> Not connected\n";
        }
    }

     // Clear log on reload
    log.value = "";
