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
		buildLogicMessage();
		wsSendLogicMessage();
}, false);


function createInitiatorModulesArray () {
	var i = 0;
	$("#IF-dropzone").children(".drag-drop").each(function(){
		var id = $(this);
		in_modules.push(id);
		console.log("Initiator Modules :" + in_modules[i].attr('id'));
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
		$.each(in_modules, function( index, value ) {
			//if (value[index].getAttribute("data-mtype") == "outlet"){
					console.log("Initiator: " + index + ": " + value[index].getAttribute("id"));
			//	}
		});
}

function parseReceiverModules (out_modules) {
		$.each(out_modules, function( index, value ) {
			//if (value[index].getAttribute("data-mtype") == "outlet"){
					console.log("Receiver: " + index + ": " + value[index].getAttribute("id"));
			//	}
		});
}
