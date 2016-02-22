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
var Toast = require("nativescript-toast");
var validator = require("../../../common/validation");
var camera = require("camera");
var tabViewModule = require("ui/tab-view");

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
            console.log(tabViewModule.item);
            

            topmost = frameModule.topmost();
        },
        
        saveNote: function() {

            var record = {
                noteContent: "'"+ model.noteContent +"'",
                noteType: "'"+ model.noteType +"'",
                noteImagePath: "'"+ model.noteImagePath +"'"
            };
            
            if(validator.checkLenght(record["noteContent"], 5, 130)){
                console.log(record["noteContent"]);
                console.log(record["noteContent"].length);
                if(validator.validateDescription(record['noteContent'])){
                    liteDb.insertRecord(notesModel.tableName, record);
                    navigation.goToAllNotes();
                    var toast = Toast.makeText("You successfully added a new note!");
                    toast.show();
                } else{
                       var errToastSymbols = Toast.makeText("Your note contain illegal symbol (can cointain only letters, diggits and . , ! ? ())");
                        errToastSymbols.show();
                }
            } else{
                var errToast = Toast.makeText("Your note should be longer than 3 symbols and shorter than 128");
                errToast.show();
            }
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