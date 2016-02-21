'use strict';

var vmModule = require("./events-page-view-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.pageViewModel;
}

exports.pageLoaded = pageLoaded;
