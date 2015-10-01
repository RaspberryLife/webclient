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
			name: 'DerAdmin',
			email: 'admin@jaeristderadmin.de',
			role : 'admin',
			password : 'verschlüsseltespasswort1234'
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
var insertlogic = function insertlogic(){
	console.log(fensterlogik);
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/logic"),
		method: 'POST',
		data: {
			logic : JSON.stringify(fensterlogik)
		}
	}).success(function (response) {
		console.log(response);
	});
};

var fensterlogik = {
	name : 'fensterlogik',

	// frequency of checking for status
	executionFrequency : {
		type : 'daily', // immediately, minutely, hourly, daily, weekly, monthly
		minute : 50,
		hour : 17,
		day : 0,
		week : 0
	},

	// single / majority / all
	executionRequirement : 'single',

	//Array of triggers
	triggers : [
		{
			module : {
				id : '0'
			},
			condition : {
				fieldId : 1, // id of the field that is watched
				state : true // window open
			}
		},
		{
			module : {
				id : '1'
			},
			condition : {
				fieldId : 1,
				state : true
			}
		}
	],

	//array of actions to execute
	actions : [
		{
			type: 'notify', // notify a user
			user_id: 0, //user to notify
			message: 'fenster offen du depp'
		}
	]

}; // end the logic

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

var getModules = function getModules () {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/modules")
	}).success(function (response) {
		console.log(response);
	});
};

$(':input').change(function () {
	console.log($(this).data('module-name') + " is " + ($(this).prop('checked') ? 'on' : 'off'));

	if ($(this).prop('checked') === true) {
		//switch light on
	}

});

$('#testbtn').click(function(){
	insertlogic();
});

$('#loadmodules').click(function(){
	getModules();
	//updateModules();
});

$('#addadmin').click(function(){
	addNewAdminUser();
});

//showModules();
checkDatabaseAvailable();
//addNewAdminUser();
//getAdminUsers();

setTimeout(checkDatabaseAvailable(), 10000);
