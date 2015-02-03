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
		wsSendLogicMessage(logicName, initId, modType, conFieldId, conState, recId, modType);
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
			in_modules[i] = value[0];
			initId = in_modules[i].getAttribute("234");
			modType = in_modules[i].getAttribute("data-mtype");
			conFieldId = in_modules[i].childNodes[1].firstChild.getAttribute("data-field-id");
			conState = in_modules[i].childNodes[1].firstChild.checked.toString();

			i++;
			//	}
		});
}

function parseReceiverModules (out_modules) {
	i=0;
		$.each(out_modules, function( index, value ) {
			out_modules[i] = value[0];
			recId = out_modules[i].getAttribute("id");
			modType = out_modules[i].getAttribute("data-mtype");

			console.log("DEBUG: " + initId + " " + modType + " " + conFieldId + " " + conState);
			i++;
			//	}
		});
}
