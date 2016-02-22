'use strict';

 var liteDb = require(__base + "common/SQLiteDatabase"); 
 var eventsModel = require(__base + "data-models/event");
 var moment = require("moment");
 var _ = require("underscore");

function all(page) {
   var result = liteDb.getAllFromTable(eventsModel);
   var sorted = _.chain(result)
        .sortBy('eventYear')
        .sortBy('eventMonth')
        .sortBy('eventDay')
        .sortBy('eventHour')
        .sortBy('eventMinutes')
        .map(function(item){
              return {
                    id: item.id,
                    eventTitle: item.eventTitle,
                    eventDescription: item.eventDescription,
                    date: new Date(item.eventYear, item.eventMonth, item.eventDay, item.eventHour, item.eventMinutes),
                    dateFormated: moment({
                       years:item.eventYear, 
                       months:item.eventMonth, 
                       date:item.eventDay, 
                       hours:item.eventHour, 
                       minutes:item.eventMinutes}).format('DD MMM YY - HH:mm')            
              }
          })
        .value()
        .reverse()
            
            sorted.forEach(function(element) {
                console.log(element.date + " - " + element.eventTitle)
            }, this);
            
   return sorted;
}

function byDate(day, month, year) {
     var events = liteDb.getAllFromTableWithDate(eventsModel, day, month, year);
     var sorted = _.chain(events)
        .sortBy('eventYear')
        .sortBy('eventMonth')
        .sortBy('eventDay')
        .sortBy('eventHour')
        .sortBy('eventMinutes')
        .map(function(item){
              return {
                    id: item.id,
                    eventTitle: item.eventTitle,
                    eventDescription: item.eventDescription,
                    date: new Date(item.eventYear, item.eventMonth, item.eventDay, item.eventHour, item.eventMinutes),
                    dateFormated: moment({
                       years:item.eventYear, 
                       months:item.eventMonth, 
                       date:item.eventDay, 
                       hours:item.eventHour, 
                       minutes:item.eventMinutes}).format('HH:MM')            
              }
          })
        .value()
        .reverse()       
     
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