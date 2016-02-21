"use strict";

var page = require("ui/page");
var view = require("ui/core/view");
var labelModule = require("ui/label")
var observable = require("data/observable");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var notesModel = require(__base + "data-models/note");
var liteDb = require(__base + "common/SQLiteDatabase");
var navigation = require(__base + "common/navigation");

var topmost;
    
var pageModules = (function() {   

    var model = new observable.Observable({
        noteContent: "",
        noteType: "",
        noteImagePath: ""
    });

    var pageModules = {

        onLoaded: function(args) {
            var page = args.object;

            page.bindingContext = model;
            model.noteContent = "";
            model.noteType = "";
            

            topmost = frameModule.topmost();
        },
        saveNote: function() {

            var record = {
                noteContent: "'"+ model.noteContent +"'",
                noteType: "'"+ model.noteType +"'",
                noteImagePath: "'"+ model.noteImagePath +"'"
            };
            liteDb.insertRecord(notesModel.tableName, record);
            navigation.goToAllNotes();
            // TODO: do something with the data
            //console.log(JSON.stringify(model, null, 4));
            //console.log(model.eventHour)
            //console.log(model.eventMinutes)

        }
    }

    return pageModules;
})();

exports.onLoaded = pageModules.onLoaded;
exports.indexChange = pageModules.indexChange;
exports.saveNote = pageModules.saveNote;