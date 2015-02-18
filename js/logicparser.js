var dcodeIO;
var RBLMessage = dcodeIO.ProtoBuf.loadProtoFile("proto/raspberrylife.proto").build("RBLMessage");
var savebtn = document.getElementById('save-logic');
var in_modules = [];
var out_modules = [];
var initId = [];
var recId = [];

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
		console.log("Initiator Modules :" + in_modules.length);
		i++;
	});
}

function createReceiverModulesArray () {
	var j = 0;
	$("#THEN-dropzone").children(".drag-drop").each(function(){
		var id = $(this);
		out_modules.push(id);
		console.log("Receiver Modules :" + out_modules.length);
		j++;
	});
}

function parseInitiatorModules (in_modules) {
	k=0;
		$.each(in_modules, function( index, value ) {
			in_modules[k] = value[0];
			initId[k] = in_modules[k].getAttribute("id");
			modType = in_modules[k].getAttribute("data-mtype");
			conFieldId = in_modules[k].childNodes[1].firstChild.getAttribute("data-field-id");
			conState = in_modules[k].childNodes[1].firstChild.checked.toString();
			k++;
		});
}

function parseReceiverModules (out_modules) {
	l=0;
		$.each(out_modules, function( index, value ) {
			out_modules[l] = value[0];
			recId[l] = out_modules[l].getAttribute("id");
			modType = out_modules[l].getAttribute("data-mtype");
			l++;
		});
}
