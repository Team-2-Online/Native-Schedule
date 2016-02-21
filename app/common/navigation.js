'use strict';

var frameModule = require("ui/frame");

module.exports = {
	goToAllEvents: function() {
		frameModule.topmost().navigate("views/events/all-events/events-page");
	},
	goToAddEvent: function() {
		frameModule.topmost().navigate("views/events/create-event/create-event");
	},
	goToAllNotes: function() {
		frameModule.topmost().navigate("views/notes/all-notes/notes-page");
	}
};
