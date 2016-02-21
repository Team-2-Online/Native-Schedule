/* global ; */
'use strict';

var vmModule = require("./notes-view-model");
var listViewModule = require("ui/list-view");

var page = require("ui/page");
var view = require("ui/core/view");
var frameModule = require("ui/frame");
var wrapLayoutModule = require("ui/layouts/wrap-layout");
var imageModule = require("ui/image");
var textViewModule = require("ui/text-view");
var platformModule = require("platform");
var labelModule = require("ui/label")


var topmost;

function pageLoaded(args) {
    console.log("da ti sera")
    var page = args.object;
    //vmModule.pageViewModel.allEvents();
    page.bindingContext = vmModule.notesPageViewModel;

    topmost = frameModule.topmost();

    var notesWrapperImgs = view.getViewById(page, "notes-wrapper-imgs");
    var notesWrapperText = view.getViewById(page, "notes-wrapper-text");

    var width = (platformModule.screen.mainScreen.widthDIPs / 2);


    if (notesWrapperText && notesWrapperImgs) {
        var i = 0;       

        vmModule.notesPageViewModel.allNotes().forEach(function (params) {

            var stickyImage = new imageModule.Image();
            stickyImage.src = "res://note";
            stickyImage.stretch = "fill";
            stickyImage.width = width;
            stickyImage.height = width;

            notesWrapperImgs.addChild(stickyImage);

            var label = new labelModule.Label();
            label.text = params.noteContent;
            label.width = width;
            label.height = width;
            label.cssClass = "sticky-text";
            label.textWrap = true;

            notesWrapperText.addChild(label);

            i += 1;
        })

        console.log("loaded")
    }
}

exports.pageLoaded = pageLoaded;