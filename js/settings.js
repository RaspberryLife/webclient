function restoreSettings(){

	var settingssavebtn = document.getElementById('save-settings');
	var settingsdeletebtn = document.getElementById('delete-settings');
	var firstname = document.getElementById('firstname');
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var elm_save = '<br><br><div class="alert alert-success alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button> Settings saved! </div>';
	var elm_delete = '<br><br><div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button> Settings deleted! </div>';

	settingssavebtn.addEventListener('click', function() {
		$.cookie("firstname", firstname.value,  { expires: 7, path: '/' });
		$.cookie("email", email.value,  { expires: 7, path: '/' });
		$.cookie("password", password.value,  { expires: 7, path: '/' });

		//Save admin user in database
		addAdminUser(firstname.value, email.value, password.value);

		console.log("Settings saved");
		$(elm_save).appendTo("#settings");

	}, false);


	settingsdeletebtn.addEventListener('click', function() {
		$.removeCookie('firstname');
		$.removeCookie('email');

		$.removeCookie('password');
		$(elm_delete).appendTo("#settings");

	}, false);

	firstname.value = $.cookie('firstname');
	email.value = $.cookie('email');
	password.value = $.cookie('password');
}

var addAdminUser = function addAdminUser(username, email, password){
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/user"),
		method: 'POST',
		data: {
			name: username,
			email: email,
			role : 'admin',
			password : password
		}
	}).success(function (response) {
		console.log(response);
	});
};
