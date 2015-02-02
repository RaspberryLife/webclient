
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
	
	var runInstructionMessage = new RBLMessage({
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

	console.log("RUNINSTRUCTIONMESSAGE: " + runInstructionMessage);
	return runInstructionMessage;
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

function buildLogicMessage(clientID, msgType, msgFlag, msgNumber, crudType, logicId, logicName, exeType, exeReq, initType, initId, conFieldId, conState, recType, recId, insId, params, modType, modId) {
	var logicInitiatorMessage = new RBLMessage({
			"id": "webclient_logic",
			"messageType": "LOGIC",
			"messageFlag": "REQUEST",
			"messageNumber": "234",

		"logic":
			{
				"crudType": "0",
				"id": "52",
				"name": logicName,

				"exeFrequency":
				{
						"exeType": "IMMEDIATELY"
					},

				"exeRequirement": "SINGLE",

				"logicInitiator":
					{

						"initiator":
							{
								"actuatorType": "MODULE",
								"actuatorId": initId
							},

						"condition":
								{
								"fieldId": conFieldId,
								"state": conState
								}
					},

				"logicReceiver":
					{

						"receiver":
							{
								"actuatorType": "MODULE",
								"actuatorId": recId
							},

						"instruction":
								{
								"instructionId": "51",
								"parameters": "",
								"moduleType": modType,
								"moduleId": "23"
								}
					}
			}
		});

	console.log("RUNINSTRUCTIONMESSAGE: " + logicInitiatorMessage);
	return logicInitiatorMessage;
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
