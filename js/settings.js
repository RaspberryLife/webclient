var greetingname = document.getElementById('greeting-name');

function getUserName(){
	if ($.cookie('firstname') != undefined){
	$(greetingname).text("Hello " + $.cookie('firstname') + "!");
	}
}
