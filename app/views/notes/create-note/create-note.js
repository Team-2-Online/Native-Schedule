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
var cameraModule = require("camera");
var imageModule = require("ui/image");
var imageSource = require("image-source");
var fs = require("file-system");
var tabViewModule = require("ui/tab-view");
var notesService = require(__base + "services/notes-service");
var moment = require("moment");

var topmost;

var pageModules = (function () {

    var model = new observable.Observable({
        noteContent: "",
        noteType: "",
        noteImagePath: ""
    });

    var page;

    var pageModules = {

        onLoaded: function (args) {
            page = args.object;
            page.bindingContext = model;
            model.noteContent = "";
            model.noteType = "";
            console.log(tabViewModule.item);
            topmost = frameModule.topmost();
        },

        addImageNote: function () {
            cameraModule.takePicture().then(function (picture) {
                var imgName = "note_pic_" + moment().valueOf() + ".jpeg"
                var folder = fs.knownFolders.documents();
                var path = fs.path.join(folder.path, imgName);
                
                var result = notesService.save(null, path, "image")   
                
                picture.saveToFile(path, "jpeg");
                navigation.goToAllNotes();
            });
        },

        saveNote: function () {
            var content = model.noteContent;
                
            if (validator.checkLenght(content, 5, 130)) {
                console.log(content);
                console.log(content.length);
                if (validator.validateDescription(content)) {
                    
                    notesService.save(model.noteContent, null, "text")                    
                    navigation.goToAllNotes();
                    
                    var toast = Toast.makeText("You successfully added a new note!");
                    toast.show();
                } else {
                    var errToastSymbols = Toast.makeText("Your note contain illegal symbol (can cointain only letters, diggits and . , ! ? ())");
                    errToastSymbols.show();
                }
            } else {
                var errToast = Toast.makeText("Your note should be longer than 3 symbols and shorter than 128");
                errToast.show();
            }
        }
    }

    return pageModules;
})();

exports.onLoaded = pageModules.onLoaded;
exports.indexChange = pageModules.indexChange;
exports.saveNote = pageModules.saveNote;
exports.addImageNote = pageModules.addImageNote;