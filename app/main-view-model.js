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
    
    HomePageModel.prototype.upcomingEvents = function () {
        var resultDb = eventsService.upcoming();
		var result = new observableArray.ObservableArray(resultDb);
		return result;
	};

	HomePageModel.prototype.navigateToNotesPage = navigation.goToAllNotes
	HomePageModel.prototype.navigateToEventsPage = navigation.goToAllEvents
	
	return HomePageModel;
})(observable.Observable);
exports.mainViewModel = new HomePageModel();
