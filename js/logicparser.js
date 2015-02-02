var dcodeIO;
var RBLMessage = dcodeIO.ProtoBuf.loadProtoFile("proto/raspberrylife.proto").build("RBLMessage");
var savebtn = document.getElementById('save-logic');
var in_modules = [];
var out_modules = [];

savebtn.addEventListener('click', function() {
    createInitiatorModulesArray();
		createReceiverModulesArray();
		parseInitiatorModules(in_modules);
		parseReceiverModules(out_modules);
		logicName = document.getElementById('logic-name').value;
		//buildLogicMessage();
		wsSendLogicMessage(logicName);
}, false);


function createInitiatorModulesArray () {
	var i = 0;
	$("#IF-dropzone").children(".drag-drop").each(function(){
		var id = $(this);
		in_modules.push(id);
		//console.log("Initiator Modules :" + in_modules[i].attr('id'));
		i++;
	});
}

function createReceiverModulesArray () {
	var i = 0;
	$("#THEN-dropzone").children(".drag-drop").each(function(){
		var id = $(this);
		out_modules.push(id);
		console.log("Receiver Modules :" + out_modules[i].attr('id'));
		i++;
	});
}

function parseInitiatorModules (in_modules) {
	i=0;
		$.each(in_modules, function( index, value ) {
			//if (value[index].getAttribute("data-mtype") == "outlet"){
			//in_modules[i] = value[0].getAttribute("id");
			in_modules[i] = value[0];

			initId = in_modules[i].getAttribute("id");
			modType = in_modules[i].getAttribute("data-mtype");
			conFieldId = in_modules[i].childNodes[1].getAttribute("type");
			//.getAttribute("data-field-id");

			console.log("DEBUG: " + initId + " " + modType + " " + conFieldId);
			i++;
			//	}
		});
	console.log("in_modules array: " + in_modules.toString());
}

function parseReceiverModules (out_modules) {
		$.each(out_modules, function( index, value ) {
			//if (value[index].getAttribute("data-mtype") == "outlet"){
					console.log("Receiver: " + index + ": " + value[index].getAttribute("id"));
			//	}
		});
}
