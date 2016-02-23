'use strict'

let observable = require("data/observable");
var observableArray = require("data/observable-array");
let frameModule = require('ui/frame');
var eventsService = require(__base + "services/events-service");


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
    
    HomePageModel.prototype.upcomingEvents = function () {
        var resultDb = eventsService.upcoming();
		var result = new observableArray.ObservableArray(resultDb);
		return result;
	};

	HomePageModel.prototype.navigateToNotesPage = function(){
        var topmost = frameModule.topmost();
        var navigationEntry = {
				moduleName: "./views/notes/all-notes/notes-page",
				backstackVisible: true,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};

			topmost.navigate(navigationEntry);
		};

	HomePageModel.prototype.navigateToEventsPage = function(){
        var navigationEntry = {
				moduleName: "./views/events/all-events/events-page",
				backstackVisible: true,
				animated: true,
			    transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		};

	HomePageModel.prototype.navigateToAddEventPage = function(){
        var navigationEntry = {
				moduleName: "./views/events/create-event/create-event",
				backstackVisible: true,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		};
    
    HomePageModel.prototype.navigateToAddNotePage = function(){
        var navigationEntry = {
				moduleName: "./views/notes/create-note/create-note",
				backstackVisible: true,
				animated: true,
				transition: {
					name: "flip",
                    duration:380,
                    curve: "easeIn"
				},
			};

			frameModule.topmost().navigate(navigationEntry);
		};        

	return HomePageModel;
})(observable.Observable);
exports.mainViewModel = new HomePageModel();
