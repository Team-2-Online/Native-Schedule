'use strict';

var vmModule = require("./events-page-view-model");
var listViewModule = require("ui/list-view");
let frame = require('ui/frame');
var page = require("ui/page");
var view = require("ui/core/view");
var eventsService = require(__base + "services/events-service");
var navigation = require(__base + "common/navigation");
var toaster = require("nativescript-toast");
var dialogs = require("ui/dialogs");

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.pageViewModel;
    console.log("loaded")
}

function deleteSomeEvent(args) {
    dialogs.confirm({
        title: "Delete event",
        message: "Are you sure you'd like to delete this event?",
        okButtonText: "Yes",
        cancelButtonText: "No",
    }).then(function (result) {
        if (result) {
            eventsService.deleteById(args.object.id)
            var toast = toaster.makeText("You successfully deleted this event");
            toast.show();
            navigation.goToAllEvents();
        }
    });
}

function eventItemTapped(args) {


    let page = args.object.page;
    let vm = page.bindingContext;
    let index = args.index;
    let event = vm.allEvents().getItem(index);
    let options = {
        moduleName: './views/events/event-details/event-details',
        context: event
    };
    frame.topmost()
        .navigate(options);
}

module.exports = {
    eventItemTapped,
    pageLoaded,
    deleteSomeEvent
};
