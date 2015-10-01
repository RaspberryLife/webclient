var connectionUrl = "http://localhost:8080";

var getConnectionUrl = function getConnectionUrl(path){
	return connectionUrl + path;
};


var checkServerAvailable = function checkDatabaseAvailable() {
	$.ajax({
		url: getConnectionUrl("/rbl/system/available")
	}).success(function (response) {
		var server_status = $('#server_status');
		server_status.html(response ? 'Available' : 'Not available');
	});
};

var getAdminUsers = function getAdminUsers() {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/adminusers")
	}).success(function (response) {
		console.log(response);
	});
};

var sendSerialMessage = function sendSerialMessage(){
	$.ajax({
		url: getConnectionUrl("/rbl/serial/send"),
		method: 'POST',
		data: {
			instructionId: 0,
			moduleId: 0,
			moduleType: 0,
			parameters: []
		}
	});
};


//update discovered modules with names and rooms
var updateModules = function insertModules() {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/updatemodule"),
		method: 'POST',
		data: {
			id: 0,
			name : 'fenster1',
			room : 'fablab'
		}
	});

	$.ajax({
		url: getConnectionUrl("/rbl/system/database/updatemodule"),
		method: 'POST',
		data: {
			id: 1,
			name : 'fenster1',
			room : 'fablab'
		}
	});
};

var getModules = function getModules (container, source_template) {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/modules")
	}).success(function (response) {
		var moduleContainer = $(container);
		var source = $(source_template).html();
		var template = Handlebars.compile(source);
		var context  = {modules: response};
		moduleContainer.html(template(context));
	});
};



