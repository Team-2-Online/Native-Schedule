'use strict'
var vmModule = require("./main-view-model");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
}

function navigateToNotesPage() {
    vmModule.mainViewModel.navigateToNotesPage();
}

exports.pageLoaded = pageLoaded;
