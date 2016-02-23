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
var gridLayoutModule = require("ui/layouts/grid-layout");
var imageModule = require("ui/image");
var textViewModule = require("ui/text-view");
var platformModule = require("platform");
var labelModule = require("ui/label");
var toaster = require("nativescript-toast");
var imageSource = require("image-source");
var navigation = require(__base + "common/navigation");

function pageLoaded(args) {

    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;

    var notesWrapperImgs = view.getViewById(page, "notes-wrapper-imgs");
    var notesWrapperText = view.getViewById(page, "notes-wrapper-text");

    var width = (platformModule.screen.mainScreen.widthDIPs / 2);

    if (notesWrapperText && notesWrapperImgs) {

        if (vmModule.mainViewModel.upcomingEvents().length > 0) {

            vmModule.mainViewModel.upcomingEvents().forEach(function (params) {

                var gridContainer = new gridLayoutModule.GridLayout();
                gridContainer.id = params.id;
                gridContainer.width = width;
                gridContainer.height = width;
                gridContainer.padding = (width / 5)  | 0
                gridContainer.paddingTop = (width / 2.7)  | 0
                
                var label;
                label = new labelModule.Label();
                label.text = params.dateFormated;
                label.textWrap = true;

                var label2;
                label2 = new labelModule.Label();
                label2.text = params.eventTitle;
                label2.textWrap = true;

                gridLayoutModule.GridLayout.setRow(label, 0);
                gridLayoutModule.GridLayout.setRow(label2, 1);
                gridContainer.addChild(label);
                gridContainer.addChild(label2);

                var firstRow = new gridLayoutModule.ItemSpec(1, gridLayoutModule.GridUnitType.star);
                var secondRow = new gridLayoutModule.ItemSpec(2, gridLayoutModule.GridUnitType.star);

                gridContainer.addRow(firstRow)
                gridContainer.addRow(secondRow)

                notesWrapperText.addChild(gridContainer);

                var stickyImage = new imageModule.Image();
                stickyImage.src = "res://note";
                stickyImage.stretch = "fill";
                stickyImage.width = width;
                stickyImage.height = width;

                stickyImage.on(gestures.GestureTypes.doubleTap, function (args) {
   
                    navigation.goToEventDetails(params)
                 });

                notesWrapperImgs.addChild(stickyImage);
            })
        } else {

            var label;
            label = new labelModule.Label();
            label.text = "No upcoming events";
            label.width = width * 2;
            label.height = width * 2;
            label.textWrap = true;
            label.cssClass = "eventsCount";
            label.textWrap = true;

            notesWrapperText.addChild(label);

            var stickyImage = new imageModule.Image();
            stickyImage.src = "res://note";
            stickyImage.stretch = "fill";
            stickyImage.width = width * 2;
            stickyImage.height = width * 2;

            notesWrapperImgs.addChild(stickyImage);
        }
    }

    var mainGrid = view.getViewById(page, "main-grid");

    mainGrid.on(gestures.GestureTypes.swipe, function (args) {
        console.log("Swipe Direction: " + args.direction);

        var dir = args.direction;

        if (dir == 1) {
            vmModule.mainViewModel.navigateToEventsPage()
        }

        if (dir == 2) {
            vmModule.mainViewModel.navigateToNotesPage();
        }
    });

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
