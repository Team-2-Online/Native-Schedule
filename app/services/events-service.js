'use strict';

 var liteDb = require(__base + "common/SQLiteDatabase"); 
 var eventsModel = require(__base + "data-models/event");
 var moment = require("moment");
 var _ = require("underscore");
 
 var currentDate = new Date();

function all(page) {
   var result = liteDb.getAllFromTable(eventsModel);
   var sorted = _.chain(result)
        .map(function(item){            
            var itemDate = new Date(item.eventYear, item.eventMonth, item.eventDay, item.eventHour, item.eventMinutes)
              return {
                    id: item.id,
                    eventTitle: item.eventTitle,
                    eventDescription: item.eventDescription,
                    date: itemDate,
                    dateFormated: moment(itemDate).format('DD MMM YY - HH:mm'),
                     isInPast: itemDate < currentDate,
                     uiClass: (itemDate < currentDate) ? "event-in-past" : ""     
              }
          })
        .sortBy('date')
        .value()
        
   return sorted;
}

function byDate(day, month, year) {
     var events = liteDb.getAllFromTableWithDate(eventsModel, day, month, year);
     var sorted = _.chain(events)
       .map(function(item){            
            var itemDate = new Date(item.eventYear, item.eventMonth, item.eventDay, item.eventHour, item.eventMinutes)
              return {
                    id: item.id,
                    eventTitle: item.eventTitle,
                    eventDescription: item.eventDescription,
                    date: itemDate,
                    dateFormated: moment(itemDate).format('HH:mm'),
                     isInPast: itemDate < currentDate,
                     uiClass: (itemDate < currentDate) ? "event-in-past" : ""     
              }
          })
        .sortBy('date')
        .value();
     
    return sorted;
}

function byRange(day, month, year, range) {
    
     var startDay = new Date(year, month, day);
        var lastDate = new Date();
        lastDate.setDate(startDay.getDate() + range); 
        
     var events = all();
     var byRange = _.filter(events, function(ev){
         return ev.date >= startDay && ev.date <= lastDate
     })
     
    return byRange;
}

function byId(id) {
    var event = liteDb.findById(eventsModel, this.id);  
    return event;
}

module.exports = {
  all,
  byId,
  byDate,
  byRange
};