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
  
  page.bindingContext = vm.create(event);
}

function zoomInDescription(args) {
    console.log(args.object.style.color)
    
    
  args.object.fontSize += 1;
}

function zoomOutDescription(args) {
      console.log(args.object.fontSize)
  args.object.fontSize -= 1;
}

module.exports = {
  pageLoaded,
  pageNavigatedTo,
  zoomInDescription,
  zoomOutDescription
};