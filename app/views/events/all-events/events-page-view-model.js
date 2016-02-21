'use strict';

let observable = require("data/observable");
var observableArray = require("data/observable-array");
var navigation = require(__base + "common/navigation");
var eventsModel = require(__base + "data-models/event");
var liteDb = require(__base + "common/SQLiteDatabase");

var pageViewModel = (function (_super) {
	__extends(pageViewModel, _super);

	function pageViewModel() {
		_super.call(this);
	};

	function allEvents(){
	    var resultDb = liteDb.getAllFromTable(eventsModel);
		var result = new observableArray.ObservableArray(resultDb);
		// console.log(JSON.stringify(resultDb, null, 4));
		return result;
	}

	pageViewModel.prototype.navigateToAddEventPage = navigation.goToAddEvent;

	pageViewModel.prototype.allEvents = allEvents();

	return pageViewModel;
})(observable.Observable);

exports.pageViewModel = new pageViewModel();
