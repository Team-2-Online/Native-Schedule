'use strict'
var vmModule = require("./main-view-model");
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

function pageLoaded(args) {

    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;

    var notesWrapperImgs = view.getViewById(page, "notes-wrapper-imgs");
    var notesWrapperText = view.getViewById(page, "notes-wrapper-text");

    var width = (platformModule.screen.mainScreen.widthDIPs / 2);

    if (notesWrapperText && notesWrapperImgs) {

        vmModule.mainViewModel.upcomingEvents().forEach(function (params) {

            var label;
            label = new labelModule.Label();
            label.id = "note-" + params.id
            label.text = params.eventTitle;
            label.width = width;
            label.height = width;
            label.cssClass = "sticky-text";
            label.textWrap = true;

            notesWrapperText.addChild(label);


            var stickyImage = new imageModule.Image();
            stickyImage.src = "res://note";
            stickyImage.stretch = "fill";
            stickyImage.width = width;
            stickyImage.height = width;

            // var observer = stickyImage.on(gestures.GestureTypes.longPress, function (args) {
            //     console.log(params.id);
            //     console.log(params);
            //     console.log(params.noteId);
            //     dialogs.confirm({
            //         title: "Delete note",
            //         message: "Are you sure you'd like to delete this note?",
            //         okButtonText: "Yes",
            //         cancelButtonText: "No",
            //     }).then(function (result) {
            //         if (result) {
            //             liteDb.deleteById(notesModel.tableName, params.id);
            //             var toast = toaster.makeText("You successfully deleted this note");
            //             notesWrapperImgs.removeChild(stickyImage)
            //             notesWrapperText.removeChild(label)
            //             notesWrapperText.removeChild(noteImage)
            //             toast.show();
            //         }
            //     });
            // });

            notesWrapperImgs.addChild(stickyImage);
        })      
    }
    
      console.log("loaded")
      
}

function navigateToNotesPage() {
    vmModule.mainViewModel.navigateToNotesPage();
}

function navigateToEventsPage() {
    vmModule.mainViewModel.navigateToEventsPage();
}

function navigateToAddEventPage() {
    vmModule.mainViewModel.navigateToAddEventPage();
}

function navigateToAddNotePage() {
    vmModule.mainViewModel.navigateToAddNotePage();
}

exports.pageLoaded = pageLoaded;
