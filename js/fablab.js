var connection_status_text = $('#connection_status');
var connectionUrl = "http://localhost:8080";

var getConnectionUrl = function getConnectionUrl(path){
	return connectionUrl + path;
};

var showModules = function showModules(moduleList) {
	$.ajax({
		url: getConnectionUrl("/rbl/extension/fablab/modules")
	}).success(function (response) {
		connection_status_text.html("OK");
		var moduleContainer = $('#module_container');
		var source = $('#fablab_modules').html();
		var template = Handlebars.compile(source);
		var context  = {modules: response.moduleList};
		moduleContainer.html(template(context));
		response.moduleList.forEach(function () {

		});
	});
};

$(':input').change(function () {
	console.log($(this).data('module-name') + " is " + ($(this).prop('checked') ? 'on' : 'off'));

	if ($(this).prop('checked') == true) {
		//switch light on
	}

});

showModules();

//load switches
