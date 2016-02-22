'use strict'
let observable = require("data/observable");
let frameModule = require('ui/frame');

//Example use of DB
var liteDb = require(__base + "common/SQLiteDatabase");
var exampleModel = require(__base + "data-models/example");
var navigation = require(__base + "common/navigation");

var HomePageModel = (function (_super) {
	__extends(HomePageModel, _super);
	function HomePageModel() {
		_super.call(this);
		this.counter = 42;
		this.set("message", this.counter + " taps left");
	}
	HomePageModel.prototype.tapAction = function () {
		//Example use of db
		liteDb.createTable(exampleModel);
		//End of example use
		this.counter--;
		if (this.counter <= 0) {
			this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
		}
		else {
			this.set("message", this.counter + " taps left");
		}
	};

	HomePageModel.prototype.navigateToNotesPage = function(){
        var navigationEntry = {
				moduleName: "./views/notes/all-notes/notes-page",
				backstackVisible: true,
				animated: true,
				navigationTransition: {
					transition: "flip "
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		};

	HomePageModel.prototype.navigateToEventsPage = function(){
        var navigationEntry = {
				moduleName: "./views/events/all-events/events-page",
				backstackVisible: true,
				animated: true,
				navigationTransition: {
					transition: "flip "
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		};

	HomePageModel.prototype.navigateToAddEventPage = function(){
        var navigationEntry = {
				moduleName: "./views/events/create-event/create-event",
				backstackVisible: true,
				animated: true,
				nativeTransitionsAndroid: {
                 "type": "flip",
                "direction": "right"
    }
			};

			frameModule.topmost().navigate(navigationEntry);
		};
    
    HomePageModel.prototype.navigateToAddNotePage = function(){
        var navigationEntry = {
				moduleName: "./views/notes/create-note/create-note",
				backstackVisible: true,
				animated: true,
				navigationTransition: {
					transition: "flip "
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		};

	return HomePageModel;
})(observable.Observable);
exports.mainViewModel = new HomePageModel();
