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

	var userr = {
		name: "Admin1",
		email: $('#not_email').val(),
		role: 'admin'
	};

	$.ajax({
		url: getConnectionUrl("/rbl/system/database/user"),
		method: 'POST',
		data: {
			name: 'bla',
			email: 'bla',
			role : 'bla',
			password : 'blabla'
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
	console.log(thelogic);
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/logic"),
		method: 'POST',
		data: {
			logic : JSON.stringify(thelogic)
		}
	}).success(function (response) {
		console.log(response);
	});
};

var thelogic = {
	name : 'fensterlogik',

	// frequency of checking for status
	executionFrequency : {
		type : 'daily', // immediately, minutely, hourly, daily, weekly, monthly
		minute : 0,
		hour : 0,
		day : 0,
		week : 0
	},

	// single / majority / all
	executionRequirement : 'single',

	//Array of triggers
	triggers : [
		{
			module : {
				type : 'PIR',
				name: 'wnindow1'
			},
			condition : {
				fieldId : 0, // id of the field that is watched
				thresholdOver : 0,
				thresholdUnder : 0,
				state : true
			}
		},
		{
			module : {
				type : 'PIR',
				name: 'wnindow2'
			},
			condition : {
				fieldId : 0,
				thresholdOver : 0,
				thresholdUnder : 0,
				state : true
			}
		}
	],

	//array of actions to execute
	actions : [
		{
			type: 'notify', // currently only notify
			user_id: 0, //user to notify
			message: 'fenster offen du depp'
		}
	]

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

showModules();
checkDatabaseAvailable();
addNewAdminUser();
//getAdminUsers();

setTimeout(checkDatabaseAvailable(), 10000);
