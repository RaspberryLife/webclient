var baseMessage;
var plainTextMessage;

function buildBaseMessage(clientID, msgType, msgFlag, msgNumber) {
baseMessage = new RBLMessage({
			"id": clientID,
			"messageType": msgType,
			"messageFlag": msgFlag,
			"messageNumber": msgNumber
		});

	return baseMessage;
}

function buildPlainTextMessage(clientID, msgType, msgFlag, msgNumber, plainTextValue) {
baseMessage = buildBaseMessage(clientID, msgType, msgFlag, msgNumber);
plainTextMessage = $.extend(baseMessage, {"plainText": {"text": plainTextValue}});

return plainTextMessage;
}
