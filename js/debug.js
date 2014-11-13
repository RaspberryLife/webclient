if (typeof dcodeIO === 'undefined' || !dcodeIO.ProtoBuf) {
            throw (new Error("ProtoBuf.js is not present."));
        }
         // Initialize ProtoBuf.js
        var ProtoBuf = dcodeIO.ProtoBuf;
        var RBLMessage = ProtoBuf.loadProtoFile("raspberrylife.proto").build("RBLMessage");

    var currentTime;
    var id = document.getElementById("id");
    var mType = document.getElementById("mType");
    var plainText = document.getElementById("plainText");
    var clientID = "webclient1";
    var log = document.getElementById("log");
    var message;
    var socket = "";

    // Default socket IP
    var socketIP = "localhost";

// Connect to websocket
function createWebSocket(){
  socketIP = document.getElementById("socketIP").value;
  socket = new WebSocket("ws://" + socketIP + ":6680/websocket-echo");
  socket.binaryType = "arraybuffer";

  socket.onopen = function () {
      log.value += getCurrentTime() + "> Connected\n";
  };

  socket.onclose = function () {
      log.value += getCurrentTime() + "> Disconnected\n";
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

          log.value += getCurrentTime() + "> Modul: " + modulID + "\n";
          log.value += getCurrentTime() + "> Einheit: " + modulType + "\n";
          log.value += getCurrentTime() + "> Wert: " + modulValue + "\n";
          log.value += getCurrentTime() + "> Datum von: " + startDateTime + "\n";
          log.value += getCurrentTime() + "> Datum bis: " + endDateTime + "\n";
          log.value += getCurrentTime() + "> Object type: " + Object.prototype.toString.call(testFloat1) + "\n";
          log.value += getCurrentTime() + "> data array length: " + testFloat1.length + "\n";
log.scrollTop( textArea[0].scrollHeight - textArea.height()   );

      } catch (err) {
          log.value += getCurrentTime() + "> Error: " + err + "\n";
      }
  };
}


function getCurrentTime() {
  var date = new Date();
    currentTime =   date.toLocaleTimeString() + " ";
    return currentTime;
}


    function getModulID() {
        log.value += getCurrentTime() + "> MODUL ID: " + modulID + "\n";
        return modulID;
    }


     // Send protobuf message
    function send() {
        if (socket.readyState == WebSocket.OPEN) {
            message = new RBLMessage(clientID, RBLMessage.MessageType.PLAIN_TEXT, 0, new RBLMessage.PlainText(plainText.value));
            socket.send(message.toArrayBuffer());
            log.value += getCurrentTime() + "> Message Sent: " + message.plainText.text + "\n";
            //socket.onmessage();
        } else {
            log.value += getCurrentTime() + "> Not connected\n";
        }
    }


    function sendGetDataMessage() {
        if (socket.readyState == WebSocket.OPEN) {
            var message = new RBLMessage(clientID, RBLMessage.MessageType.GET_DATA_SET, 0, new RBLMessage.GetDataSet("livingrooom_sensormodule", "temp", 20, "bla", "bla2"));


            socket.send(message.toArrayBuffer());

            log.value += getCurrentTime() + "> Get Data Request Sent\n";
        } else {
            log.value += getCurrentTime() + "> Not connected\n";
        }
    }

     // Send authentication request
    function sendAuthRequestMessage() {
        if (socket.readyState == WebSocket.OPEN) {
            var message = new RBLMessage(clientID, RBLMessage.MessageType.AUTH_REQUEST, 0, new RBLMessage.PlainText("abc12345"));
            socket.send(message.toArrayBuffer());
            log.value += getCurrentTime() + "> Authentication Request Sent\n";
        } else {
            log.value += getCurrentTime() + "> Not connected\n";
        }
    }

     // Clear log on reload
     log.value = "";
