'use strict';

var vmModule = require("./events-page-view-model");
var listViewModule = require("ui/list-view");
let frame = require('ui/frame');

function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vmModule.pageViewModel;
    console.log("loaded")
}

function eventItemTapped(args) {
   
  let page = args.object.page;
  let vm = page.bindingContext;
  let index = args.index;
  let event = vm.allEvents().getItem(index);
  let options = {
    moduleName:  './views/events/event-details/event-details',
    context: event
  };
  frame.topmost()
    .navigate(options);
}

module.exports = {
  eventItemTapped,
  pageLoaded
};
