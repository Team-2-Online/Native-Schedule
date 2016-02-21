var page = require("ui/page");
var view = require("ui/core/view");
var labelModule = require("ui/label")
var observable = require("data/observable");
var frameModule = require("ui/frame");
var dialogs = require("ui/dialogs");

var pageModules = (function() {
    
    var currentDate = new Date();
    var testEvents = [{
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stana?"
        },
        {
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stanaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaa?"
        },
        {
            dateTime: "02/05/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaaaa?"
        },
        {
            dateTime: "02/07/16/ 17:15",
            title: "Ebasimo ko stana?aaaaaaaaaa"
        },
        {
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stanaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaa?"
        },
        {
            dateTime: "02/05/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaaaa?"
        },
        {
            dateTime: "02/07/16/ 17:15",
            title: "Ebasimo ko stana?aaaaaaaaaa"
        },
        {
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stanaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaa?"
        },
        {
            dateTime: "02/05/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaaaa?"
        },
        {
            dateTime: "02/07/16/ 17:15",
            title: "Ebasimo ko stana?aaaaaaaaaa"
        },
        {
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stanaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaa?"
        },
        {
            dateTime: "02/05/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaaaa?"
        },
        {
            dateTime: "02/07/16/ 17:15",
            title: "Ebasimo ko stana?aaaaaaaaaa"
        },
        {
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stanaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaa?"
        },
        {
            dateTime: "02/05/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaaaa?"
        },
        {
            dateTime: "02/07/16/ 17:15",
            title: "Ebasimo ko stana?aaaaaaaaaa"
        },
        {
            dateTime: "02/02/16/ 17:15",
            title: "Ebasimo ko stanaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaa?"
        },
        {
            dateTime: "02/03/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaa?"
        },
        {
            dateTime: "02/05/16/ 17:15",
            title: "Ebasimo ko stanaaaaaaaaa?"
        },
        {
            dateTime: "02/07/16/ 17:15",
            title: "Ebasimo ko stana?aaaaaaaaaa"
        }]
        
        console.log(testEvents[0].title);
    
    
    var model = new observable.Observable({
        eventTitle:"fefewrgwehrtehtehh",
        eventDescription: "fefewrgwehrtehtehh",
        eventDay: currentDate.getDate(),
        eventMonth: currentDate.getMonth(),
        eventYear:  currentDate.getFullYear(),
        eventHour:  currentDate.getHours(),
        eventMinutes:  currentDate.getMinutes(),
        someEvents: testEvents        
    })

    var topmost;

    var pageModules = {

        onLoaded: function(args) {
            var page = args.object;

            page.bindingContext = model;    
            
            
            topmost = frameModule.topmost();
        },        
         saveEvent: function() {
             
            // TODO: do something with the data
            console.log(model.eventHour)
            console.log(model.eventMinutes)
            
        }
    
    }

    return pageModules;
})();


exports.onLoaded = pageModules.onLoaded;
exports.indexChange = pageModules.indexChange;
// exports.saveEvent = pageModules.saveEvent;

