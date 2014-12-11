var savebtn = document.getElementById('save-logic');
var in_modules = [];
var out_modules = [];

savebtn.addEventListener('click', function() {
    createConditionModulesArray();
		createEffectModulesArray();
}, false);



function createConditionModulesArray () {
	var i = 0;
	$("#IF-dropzone").children(".drag-drop").each(function(){
		var id = $(this);
		in_modules.push(id);
		console.log("Condition Modules :" + in_modules[i].attr('id'));
		i++;
	});
}

function createEffectModulesArray () {
	var i = 0;
	$("#THEN-dropzone").children(".drag-drop").each(function(){
		var id = $(this);
		out_modules.push(id);
		console.log("Effect Modules :" + out_modules[i].attr('id'));
		i++;
	});
}
