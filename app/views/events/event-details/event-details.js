'use strict';

let vm = require('./event-details-view-model');

// let services = require('../../services');

function pageLoaded(args) {}

function pageNavigatedTo(args) {
    console.log("huc in navigateTo")
    

  let page = args.object;
  let event = args.context;
  
      console.log(page)
            console.log(event.id)
                 console.log(event.eventTitle)
  
  page.bindingContext = vm.create(event.id, event.eventTitle);
}

function zoomInDescription(args) {
  args.object.fontSize += 1;
}

function zoomOutDescription(args) {
  args.object.fontSize -= 1;
}

module.exports = {
  pageLoaded,
  pageNavigatedTo,
  zoomInDescription,
  zoomOutDescription
};