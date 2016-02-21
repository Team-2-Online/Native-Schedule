'use strict'
var vmModule = require("./main-view-model");
var eventsModel = require(__base + "data-models/event");
var liteDb = require(__base + "common/SQLiteDatabase");
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.mainViewModel;
    var bySomeDate = liteDb.getAllFromTableWithDate(eventsModel, 21, 2, 2016);
    console.log(JSON.stringify(bySomeDate, null, 4));
}

function navigateToNotesPage() {
    vmModule.mainViewModel.navigateToNotesPage();
}

function navigateToEventsPage(){
    vmModule.mainViewModel.navigateToEventsPage();
}

function navigateToAddEventPage(){
    vmModule.mainViewModel.navigateToAddEventPage();
}

exports.pageLoaded = pageLoaded;
