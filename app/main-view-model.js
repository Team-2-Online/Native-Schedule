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

	HomePageModel.prototype.navigateToNotesPage = navigation.goToAllNotes;

	HomePageModel.prototype.navigateToEventsPage = navigation.goToAllEvents;

	return HomePageModel;
})(observable.Observable);
exports.mainViewModel = new HomePageModel();
