'use strict';

var vmModule = require("./events-page-view-model");
var listViewModule = require("ui/list-view");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.pageViewModel;
    console.log("loaded")
}

exports.pageLoaded = pageLoaded;
