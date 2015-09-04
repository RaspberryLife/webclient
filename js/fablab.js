var connectionUrl = "http://localhost:8080";

var getConnectionUrl = function getConnectionUrl(path){
	return connectionUrl + path;
};

var showModules = function showModules(moduleList) {
	$.ajax({
		url: getConnectionUrl("/rbl/extension/fablab/modules")
	}).success(function (response) {
		var moduleContainer = $('#module_container');
		var source = $('#fablab_modules').html();
		var template = Handlebars.compile(source);
		var context  = {modules: response.moduleList};
		moduleContainer.html(template(context));
		response.moduleList.forEach(function () {
		});
	});
};


var checkDatabaseAvailable = function checkDatabaseAvailable() {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/available")
	}).success(function (response) {
		var database_status = $('#database_status');
		database_status.html(response ? 'Available' : 'Not available');
	});
};



var getAdminUsers = function getAdminUsers() {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/adminusers")
	}).success(function (response) {
		console.log(response);
	});
};

var addNewAdminUser = function addNewAdminUser(){
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/user"),
		method: 'POST',
		data: {
			name: "Admin1",
			email: $('#not_email').val(),
			role: 'admin'
		}
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

$(':input').change(function () {
	console.log($(this).data('module-name') + " is " + ($(this).prop('checked') ? 'on' : 'off'));

	if ($(this).prop('checked') == true) {
		//switch light on
	}

});

showModules();
checkDatabaseAvailable();
getAdminUsers();
addNewAdminUser();

setTimeout(checkDatabaseAvailable(), 10000);
