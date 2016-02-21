"use strict";

var page = require("ui/page");
var view = require("ui/core/view");
var labelModule = require("ui/label")
var observable = require("data/observable");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");
var eventsModel = require(__base + "data-models/event");
var liteDb = require(__base + "common/SQLiteDatabase");
var navigation = require(__base + "common/navigation");

var pageModules = (function() {

    var currentDate = new Date();

    var model = new observable.Observable({
        eventTitle: "",
        eventDescription: "",
        eventDay: currentDate.getDate(),
        eventMonth: currentDate.getMonth(),
        eventYear:  currentDate.getFullYear(),
        eventHour:  currentDate.getHours(),
        eventMinutes:  currentDate.getMinutes(),
    });

    var topmost;

    var pageModules = {

        onLoaded: function(args) {
            var page = args.object;

            page.bindingContext = model;
            

            topmost = frameModule.topmost();
        },
        saveEvent: function() {

            var record = {
                eventTitle: "'"+ model.eventTitle +"'",
                eventDescription: "'"+ model.eventDescription +"'",
                eventDay: model.eventDay,
                eventMonth: model.eventMonth,
                eventYear: model.eventYear,
                eventHour: model.eventHour,
                eventMinutes: model.eventMinutes
            };
            liteDb.insertRecord(eventsModel.tableName, record);
            navigation.goToAllEvents();
            // TODO: do something with the data
            //console.log(JSON.stringify(model, null, 4));
            //console.log(model.eventHour)
            //console.log(model.eventMinutes)

        }

    }

    return pageModules;
})();

exports.onLoaded = pageModules.onLoaded;
exports.indexChange = pageModules.indexChange;
exports.saveEvent = pageModules.saveEvent;
