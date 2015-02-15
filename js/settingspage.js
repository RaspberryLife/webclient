var settingssavebtn = document.getElementById('save-settings');
var settingsdeletebtn = document.getElementById('delete-settings');
var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
var email = document.getElementById('email');
var password = document.getElementById('password');

settingssavebtn.addEventListener('click', function() {
		$.cookie("firstname", firstname.value,  { expires: 7, path: '/' });
		$.cookie("lastname", lastname.value,  { expires: 7, path: '/' });
		$.cookie("email", email.value,  { expires: 7, path: '/' });
		$.cookie("password", password.value,  { expires: 7, path: '/' });
		console.log("Settings saved");

	var elm = '<br><br><div class="alert alert-success alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button> Settings saved! </div>';
$(elm).appendTo("#settings");

}, false);

settingsdeletebtn.addEventListener('click', function() {
$.removeCookie('firstname');
$.removeCookie('lastname');
$.removeCookie('email');
$.removeCookie('password');

var elm = '<br><br><div class="alert alert-danger alert-dismissible" role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span></button> Settings deleted! </div>';
$(elm).appendTo("#settings");
}, false);

function restoreSettings(){
	firstname.value = $.cookie('firstname');
	lastname.value = $.cookie('lastname');
	email.value = $.cookie('email');
	password.value = $.cookie('password');

}
