'use strict';

var frameModule = require("ui/frame");

module.exports = {
	goToAllEvents: function() {
        var navigationEntry = {
				moduleName: "views/events/all-events/events-page",
				backstackVisible: true,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};

			frameModule.topmost().navigate(navigationEntry);
	},
	goToAddEvent: function() {
        var navigationEntry = {
				moduleName: "views/events/create-event/create-event",
				backstackVisible: false,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};
		frameModule.topmost().navigate(navigationEntry);
	},
	goToAllNotes: function() {
        var navigationEntry = {
				moduleName: "views/notes/all-notes/notes-page",
				backstackVisible: true,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};
		frameModule.topmost().navigate(navigationEntry);
	},
	goToAddNote: function() {
        var navigationEntry = {
				moduleName: "views/notes/create-note/create-note",
				backstackVisible: false,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};
		frameModule.topmost().navigate(navigationEntry);
	}
};
