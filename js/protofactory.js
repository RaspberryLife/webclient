
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

function buildPlainTextMessage2(clientID, msgType, msgFlag, msgNumber, plainTextValue1, plainTextValue2) {

		var plainTextMessage = new RBLMessage({
		"id": clientID,
			"messageType": msgType,
			"messageFlag": msgFlag,
			"messageNumber": msgNumber,

			"plainText":
		[
			{"text": plainTextValue1},
			{"text": plainTextValue2}
		]

		});

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
	var i = 0;
	var j = 0;
	var initiatorArray = [];
	var receiverArray = [];


	var logicInitiatorMessage = {
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
					initiatorArray,

				"logicReceiver":
					receiverArray
			}
		};

	while( i < initId.length) {
					var newValue = {
						"initiator":
							{
								"actuatorType": "MODULE",
								"actuatorId": initId[i]
							},

						"condition":
								{
								"fieldId": conFieldId,
								"state": conState
								}
					};
					initiatorArray.push(newValue);
					i++;
				}


			while( j < recId.length) {
								var newValue2 = {
								"receiver":
							{
								"actuatorType": "MODULE",
								"actuatorId": recId[j]
							},

						"instruction":
								{
								"instructionId": "51",
								"parameters": ""
								}
					}
					receiverArray.push(newValue2);
					j++
			}

	var completeLogicInitiatorMessage = new RBLMessage(logicInitiatorMessage);

	console.log("RUNINSTRUCTIONMESSAGE: " + logicInitiatorMessage);
	return completeLogicInitiatorMessage;
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

function buildDataSetMessage(clientID, msgType, msgFlag, msgNumber,crudType, dataType) {
	dataSetMessage = new RBLMessage({
			"id": clientID,
			"messageType": msgType,
			"messageFlag": msgFlag,
			"messageNumber": msgNumber,

				"dataSet":
					{
						"crudType": crudType,
						"dataType": dataType
					}
	});

	return dataSetMessage;
}

