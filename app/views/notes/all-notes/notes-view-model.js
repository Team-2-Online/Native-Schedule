'use strict';

var observable = require("data/observable");
var observableArray = require("data/observable-array");
var navigation = require(__base + "common/navigation");
var noteModel = require(__base + "data-models/note");
var liteDb = require(__base + "common/SQLiteDatabase");
var notesService = require(__base + "services/notes-service");

var notesPageViewModel = (function (_super) {
	__extends(notesPageViewModel, _super);

	function notesPageViewModel() {
		_super.call(this);
	};

	function allNotes(){
	    var resultDb = notesService.all();
		var result = new observableArray.ObservableArray(resultDb);
		return result;
	} 

	notesPageViewModel.prototype.navigateToAddNotePage = navigation.goToAddNote;

	notesPageViewModel.prototype.allNotes = allNotes;

	return notesPageViewModel;
})(observable.Observable);

exports.notesPageViewModel = new notesPageViewModel();
