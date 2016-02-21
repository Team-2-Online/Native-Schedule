'use strict';

let observable = require("data/observable");
var observableArray = require("data/observable-array");
var navigation = require(__base + "common/navigation");
var noteModel = require(__base + "data-models/note");
var liteDb = require(__base + "common/SQLiteDatabase");


var notesPageViewModel = (function (_super) {
	__extends(notesPageViewModel, _super);

	function notesPageViewModel() {
		_super.call(this);
	};

	function allNotes(){
	    var resultDb = liteDb.getAllFromTable(noteModel);
		var result = new observableArray.ObservableArray(resultDb);
		// console.log(JSON.stringify(resultDb, null, 4));
		return result;
	} 

	notesPageViewModel.prototype.navigateToAddNotePage = navigation.goToAddNote;

	notesPageViewModel.prototype.allNotes = allNotes;

	return notesPageViewModel;
})(observable.Observable);

exports.notesPageViewModel = new notesPageViewModel();
