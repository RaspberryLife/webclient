// Target elements with the "draggable" class
interact('.draggable')
	.draggable({
		// Allow dragging of multple elements at the same time
		max: Infinity,

		// Call this function on every dragmove event
		onmove: function (event) {
			var target = event.target,
			// Keep the dragged position in the data-x/data-y attributes
				x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
				y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

			// Translate the element
			target.style.webkitTransform =
				target.style.transform =
					'translate(' + x + 'px, ' + y + 'px)';

			// Update the position attributes
			target.setAttribute('data-x', x);
			target.setAttribute('data-y', y);

			target.classList.add('moving');
		},
		// Call this function on every dragend event
		onend: function (event) {
			var textEl = event.target.querySelector('p');

			textEl && (textEl.textContent =
				'moved a distance of '
				+ (Math.sqrt(event.dx * event.dx +
					event.dy * event.dy) | 0) + 'px');

			event.target.classList.remove('moving');
		}
	})
	// Enable inertial throwing
	.inertia(false)
	// Keep the element within the area of it's parent
	.restrict({
		drag: "content",
		endOnly: true,
		elementRect: {top: 0, left: 0, bottom: 1, right: 1}
	});

// Allow more than one interaction at a time
interact.maxInteractions(Infinity);


// Enable draggables to be dropped into this
interact('.dropzone').dropzone({
	// Only accept elements matching this CSS selector
	accept: '.drag-drop',
	// Require a 66% element overlap for a drop to be possible
	overlap: 0.66,

	// Listen for drop related events:

	ondropactivate: function (event) {
		// Add active dropzone feedback
		event.target.classList.add('drop-active');
	},
	ondragenter: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;

		// Feedback the possibility of a drop
		dropzoneElement.classList.add('drop-target');
		draggableElement.classList.add('can-drop');
	},
	ondragleave: function (event) {
		// Remove the drop feedback style
		event.target.classList.remove('drop-target');
		event.relatedTarget.classList.remove('can-drop');

		var draggableElement = event.relatedTarget;
	},
	ondrop: function (event) {
		var draggableElement = event.relatedTarget,
			dropzoneElement = event.target;

		$('#' + draggableElement.id).appendTo('#' + dropzoneElement.id);
		$('#' + draggableElement.id).removeAttr('style');
		$('#' + draggableElement.id).attr('data-x', 0);
		$('#' + draggableElement.id).attr('data-y', 0);

		console.log(draggableElement.id + " dropped into " + dropzoneElement.id);
		console.log(draggableElement.id + " switch status: " + dropzoneElement.id);

	},
	ondropdeactivate: function (event) {
		// remove active dropzone feedback
		event.target.classList.remove('drop-active');
		event.target.classList.remove('drop-target');
	}
});

$(function () {
	$(':input').change(function () {
		console.log(this.id + " Toggle: " + $(this).prop('checked'));
	})
});

$('#slider-handles').noUiSlider({
	start: [20, 30],
	step: 0.1,
	connect: true,
	orientation: "horizontal",
	range: {
		'min': 10,
		'max': 40
	},
	format: wNumb({
		decimals: 1,
		thousand: '.',
		postfix: ' °C',
	})
});
$('#slider-handles').Link('lower').to($('#slider-handles-lower'));
$('#slider-handles').Link('upper').to($('#slider-handles-upper'));

$('#slider-range').noUiSlider({
	start: 20,
	step: 0.1,
	connect: "lower",
	orientation: "horizontal",
	range: {
		'min': 10,
		'max': 40
	},
	format: wNumb({
		decimals: 1,
		thousand: '.',
		postfix: ' °C',
	})
});
$('#slider-range').Link('lower').to($('#slider-range-value'));


$('#save-logic').click(function(){
	var name = $('#logic-name').val();
	var exectype = $('#exec-type').val();
	var execreq = $('#exec-req').val();
	var ifs = $('#IF-dropzone').find('.drag-drop');
	var thens = $('#THEN-dropzone').find('.drag-drop');
	var triggers = [];
	var actions = [];
	$.each(ifs, function(key, value){
		triggers.push({
			module : {
				id : value.id
			},
			condition : {
				fieldId : 1, // id of the field that is watched
				state : true // window open
			}
		});
	});
	$.each(thens, function(key, value){
		actions.push({
			type: 'notify', // notify a user
			user_id: 0, //user to notify
			message: 'fenster offen du depp'
		});
	});

	var logic = getLogicMessage(name, exectype, execreq, triggers, actions);
	console.log(logic);
	insertlogic(logic);
});

var getLogicMessage = function getLogicMessage(name, exectype, execreq, triggers, actions) {
	return {
		name : name,

		// frequency of checking for status
		executionFrequency : {
			type : exectype, // immediately, minutely, hourly, daily, weekly, monthly
			minute : 50,
			hour : 17,
			day : 0,
			week : 0
		},

		// single / majority / all
		executionRequirement : execreq,

		//Array of triggers
		triggers : triggers,

		//array of actions to execute
		actions : actions
	};
};

var insertlogic = function insertlogic(logic){
	console.log(logic);
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/logic"),
		method: 'POST',
		data: {
			logic : JSON.stringify(logic)
		}
	}).success(function (response) {
		console.log(response);
	});
};

var getLogics = function() {
	$.ajax({
		url: getConnectionUrl("/rbl/system/database/logics")
	}).success(function (response) {
		$('#logics').append(JSON.stringify(response));
	});
};

getLogics();
