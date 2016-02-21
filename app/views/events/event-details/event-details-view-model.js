'use strict';

var Observable = require("data/observable")
  .Observable;
  
 var liteDb = require(__base + "common/SQLiteDatabase"); 
 var eventsModel = require(__base + "data-models/event");

class EventDetailsViewModel extends Observable {
  constructor(id, title) {
    super();
    
    console.log("in constructur")
    this.id = id;
    this.title = title; 
    // this.description = '1231232';
    this.loadDetails();
  }

  loadDetails() {
    let that = this;    
      
          console.log("in getting details")
     var searched = liteDb.findById(eventsModel.tableName, this.id);   

     console.log("decc: " +   searched["eventDescription"])
      that.set('description', searched[2]);
  }
}

module.exports = {
  create: function(id, title, description) {
    return new EventDetailsViewModel(id, title, description);
  }
};