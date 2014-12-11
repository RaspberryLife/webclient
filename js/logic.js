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
                             event.dy * event.dy)|0) + 'px');

					event.target.classList.remove('moving');
        }
    })
    // Enable inertial throwing
    .inertia(false)
    // Keep the element within the area of it's parent
    .restrict({
        drag: "content",
        endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
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
				//$('#'+draggableElement.id).appendTo('#' + 'pane1');
    },
    ondrop: function (event) {
        var draggableElement = event.relatedTarget,
            dropzoneElement = event.target;

				$('#'+draggableElement.id).appendTo('#' + dropzoneElement.id);
				$('#'+draggableElement.id).removeAttr('style');
				$('#'+draggableElement.id).attr('data-x', 0);
				$('#'+draggableElement.id).attr('data-y', 0);

				console.log(draggableElement.id + " dropped into " + dropzoneElement.id);
				console.log(draggableElement.id + " switch status: " + dropzoneElement.id);

    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');
    }
});

$(function() {
			$(':input').change(function() {
				console.log(this.id + " Toggle: " + $(this).prop('checked'));
			})
		})
