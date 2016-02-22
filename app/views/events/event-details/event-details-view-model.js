'use strict';

var Observable = require("data/observable")
  .Observable;
  
 var liteDb = require(__base + "common/SQLiteDatabase"); 
 var eventsModel = require(__base + "data-models/event");

class EventDetailsViewModel extends Observable {
  constructor(event) {
    super();
    
    console.log("in constructur")
    this.id = event.id;
    this.title = event.eventTitle; 
    this.description = event.eventDescription 
    this.date = event.date
    this.dateFormated = event.dateFormated
    this.isInPast = event.isInPast
  }
}

module.exports = {
  create: function(event) {
    return new EventDetailsViewModel(event);
  }
};