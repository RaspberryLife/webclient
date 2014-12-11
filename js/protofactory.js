
function buildBaseMessage(clientID, msgType, msgFlag, msgNumber) {
	var baseMessage = new RBLMessage({
			"id": clientID,
			"messageType": msgType,
			"messageFlag": msgFlag,
			"messageNumber": msgNumber
		});

	return baseMessage;
}

function buildPlainTextMessage(clientID, msgType, msgFlag, msgNumber, plainTextValue) {
	var baseMessage = buildBaseMessage(clientID, msgType, msgFlag, msgNumber);

	var text = {
		"plainText":
			{
				"text": plainTextValue
			}
	};

	var plainTextMessage = $.extend(baseMessage, text);

	return plainTextMessage;
}

function buildRunInstructionMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, insId, params, modType, modId) {
	var baseMessage = buildBaseMessage(clientID, msgType, msgFlag, msgNumber);
	var actuatorMessage = buildActuatorMessage(actType, actID);
	var instructionMessage = buildInstructionMessage(insId, params, modType, modId);

	var prefix = "{\"runInstruction\":";
	var suffix = "}";

	var runInstruction = {};
			console.log(runInstruction);

	var runInstructionMessage = $.extend(runInstruction, actuatorMessage, instructionMessage);
				console.log(runInstruction);

	var test2 = $.extend(baseMessage, runInstructionMessage);

		console.log(test2);


	var noobstring = new RBLMessage({
			"id": clientID,
			"messageType": msgType,
			"messageFlag": msgFlag,
			"messageNumber": msgNumber,

		"runInstruction":
			{

				"actuator":
					{
						"actuatorType": actType,
						"actuatorId": actID
					},

				"instruction":
						{
						"instructionId": insId,
						"parameters": params,
						"moduleType": modType,
						"moduleId": modId
						}
			}
		});

	console.log(noobstring);
	return noobstring;
	//return runInstructionMessage;
}

function buildActuatorMessage(actType, actID) {
	var actuatorMessage = {
		"actuator":
			{
				"actuatorType": actType,
				"actuatorId": actID
			}
	};

return actuatorMessage;
}


function buildInstructionMessage(insId, params, modType, modId) {
	var instructionMessage = {
		"instruction":
				{
				"instructionId": insId,
				"parameters": params,
				"moduleType": modType,
				"moduleId": modId
				}
	};

return instructionMessage;
}

function buildGetDataMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, fieldID) {
	var baseMessage = buildBaseMessage(clientID, msgType, msgFlag, msgNumber);
	var actuatorMessage = buildActuatorMessage(actType, actID);
	var fieldId = {
			"fieldId": fieldID
		};

	var getDataMessage = $.extend(baseMessage, actuatorMessage, fielId);

	return getDataMessage;
}


function buildSetDataMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, fieldID, fieldID, dataType, stringData, int32Data, floatData) {
	var baseMessage = buildBaseMessage(clientID, msgType, msgFlag, msgNumber);
	var actuatorMessage = buildActuatorMessage(actType, actID);
	var dataMessage = buildDataMessage(fieldID, dataType, stringData, int32Data, floatData);
	var fieldId = {
			"fieldId": fieldID
		};

	var setDataMessage = $.extend(baseMessage, actuatorMessage, fielId);

	return setDataMessage;
}



function buildDataMessage(fieldID, dataType, stringData, int32Data, floatData) {
	dataMessage = {
				"fieldId": fieldID,
				"dataType": dataType,
				"stringData": stringData,
				"int32Data": int32Data,
				"floatData": floatData
			};
	return dataMessage;
}
