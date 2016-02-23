/* global ; */
'use strict';

var vmModule = require("./notes-view-model");
var listViewModule = require("ui/list-view");
var gestures = require("ui/gestures");
var dialogs = require("ui/dialogs");
var notesModel = require(__base + "data-models/note");
var liteDb = require(__base + "common/SQLiteDatabase");
var page = require("ui/page");
var view = require("ui/core/view");
var frameModule = require("ui/frame");
var wrapLayoutModule = require("ui/layouts/wrap-layout");
var imageModule = require("ui/image");
var textViewModule = require("ui/text-view");
var platformModule = require("platform");
var labelModule = require("ui/label");
var toaster = require("nativescript-toast");
var imageSource = require("image-source");

var topmost;

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.notesPageViewModel;

    topmost = frameModule.topmost();

    var notesWrapperImgs = view.getViewById(page, "notes-wrapper-imgs");
    var notesWrapperText = view.getViewById(page, "notes-wrapper-text"); 

    var width = (platformModule.screen.mainScreen.widthDIPs / 2);

    if (notesWrapperText && notesWrapperImgs) {

        vmModule.notesPageViewModel.allNotes().forEach(function (params) {
            var noteImage;
            var label;

            if (params.noteType == "text") {
                label = new labelModule.Label();
                label.id = "note-" + params.id
                label.text = params.noteContent;
                label.width = width;
                label.height = width;
                label.cssClass = "sticky-text";
                label.textWrap = true;
                notesWrapperText.addChild(label);
            }

            if (params.noteType == "image") {
                var img = imageSource.fromFile(params.noteImagePath);
                
                var margin = (width / 3.5) | 0;
                var halfMargin = (margin / 2) | 0;
                
                noteImage = new imageModule.Image();    
                noteImage.imageSource = img; 
                noteImage.marginTop = (halfMargin / 2) | 0;  
                noteImage.marginLeft = halfMargin;       
                noteImage.stretch = "fill";               
                noteImage.width = width - margin;
                noteImage.height = width - margin;
                noteImage.opacity = 0.9;
                notesWrapperText.addChild(noteImage)
            }

            var stickyImage = new imageModule.Image();
            stickyImage.src = "res://note";
            stickyImage.stretch = "fill";
            stickyImage.width = width;
            stickyImage.height = width;

            var observer = stickyImage.on(gestures.GestureTypes.longPress, function (args) {
                console.log(params.id);
                console.log(params);
                console.log(params.noteId);
                dialogs.confirm({
                    title: "Delete note",
                    message: "Are you sure you'd like to delete this note?",
                    okButtonText: "Yes",
                    cancelButtonText: "No",
                }).then(function (result) {
                    if (result) {
                        liteDb.deleteById(notesModel.tableName, params.id);
                        var toast = toaster.makeText("You successfully deleted this note");
                        notesWrapperImgs.removeChild(stickyImage)
                        notesWrapperText.removeChild(label)
                        notesWrapperText.removeChild(noteImage)
                        toast.show();
                    }
                });
            });

            notesWrapperImgs.addChild(stickyImage);
        })

        console.log("loaded")
    }
}

exports.pageLoaded = pageLoaded;