var connection_status_text = $('#connection_status');

var checkConnection = function checkConnection() {
	console.log("Checking connection");
	$.ajax({
		url: "http://localhost:8080/rbl/extension/fablab/status",

	}).success(function(response) {
		//Logs Fablab module states
		connection_status_text.html(response.status);
	});
};

$(':input').change(function () {
	console.log($(this).data('module-name') + " is " + ($(this).prop('checked') ? 'on' : 'off'));

	if ($(this).prop('checked') == true) {
		//switch light on
	}

});

setInterval(function () {
		checkConnection();
	}
	, 3000);

//getListOfModules();
//load switches
