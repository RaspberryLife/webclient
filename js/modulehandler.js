$(function() {
			$(':input').change(function() {
				console.log(this.id + " Toggle: " + $(this).prop('checked'));
				
				if ($(this).prop('checked') == true){
					switchOn();
				}		
					
			})
		})


function switchOn() {
	
	var clientID = "webclient v0.6";
	var msgType = "RUN_INSTRUCTION";
	var msgFlag = "REQUEST";
	var msgNumber = "53";
	var actType = "MODULE";
	var actID = "1";
	var insId = "1";
	var paramsstr = "1,1,4";
	var params = paramsstr.split(',');
	var	modType = "MODULE_OUTLET";
	var	modId = "1";
	
	sendInstructionMessage(clientID, msgType, msgFlag, msgNumber, actType, actID, insId, params, modType, modId);
}


