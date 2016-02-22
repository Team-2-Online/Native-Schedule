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
var validator = require("../../../common/validation");
var Toast = require('nativescript-toast');
var mapsModule = require("nativescript-google-maps-sdk");
var geolocation = require("nativescript-geolocation");

var topmost;
var camera;
var mapView;
var myLatitude;
var myLongitude;

function onMapReady(args) {

    var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10}).
        then(function(loc) {
            if (loc) {
                myLatitude = loc.longitude;
                myLongitude = loc.latitude;

                mapView = args.object;

                var marker = new mapsModule.Marker();
                marker.position = mapsModule.Position.positionFromLatLng(myLongitude,myLatitude);
                marker.title = "Party";
                marker.snippet = "Here";
                marker.userData = { index : 1};
                mapView.addMarker(marker);
            }
        }, function(e){
            console.log("Error: " + e.message);
        });
}

function onMarkerSelect(args) {
    console.log("Clicked on " +args.marker.title);
}

function onCameraChanged(args) {

    console.log("Camera changed: " + JSON.stringify(args.camera));
}

function onCoordinateTapped(args){
    console.log("Clicked ggon " +args.coords);
}

function pageLoaded(args) {
    topmost = frameModule.topmost();

}
function addLocation(eventData) {

   globalConstants.Latitude = myLatitude;
   globalConstants.Longitude = myLongitude;

    console.log(globalConstants.Latitude);
    console.log(globalConstants.Longitude);
    topmost.goBack();
}
exports.addLocation = addLocation;
exports.pageLoaded = pageLoaded;
exports.onMapReady = onMapReady;
exports.onMarkerSelect = onMarkerSelect;
exports.onCameraChanged = onCameraChanged;
exports.onCoordinateTapped = onCoordinateTapped;

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
            model.eventTitle = "";
            model.eventDescription = "";            

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
            
            if(validator.checkLenght(record["eventTitle"], 5, 33) && validator.checkLenght(record["eventDescription"], 5, 258)){
                if(validator.validateTitle(record["eventTitle"]) && validator.validateDescription(record["eventDescription"])){
                liteDb.insertRecord(eventsModel.tableName, record);
                navigation.goToAllEvents();
                var toast = Toast.makeText("You succesfully added a new event!");
                toast.show();
                
            // TODO: do something with the data
            //console.log(JSON.stringify(model, null, 4));
            //console.log(model.eventHour)
            //console.log(model.eventMinutes)
                } else{
                    var errToastIllegal = Toast.makeText("The title or the description contaiin illegal symbols");
                    errToastIllegal.show();
                }
            } else{
                var errLenToast = Toast.makeText("The title should be long between 3 and 32 symbols and the description - between 3 and 256");
                errLenToast.show();
            }
        }
    }

    return pageModules;
})();

exports.onLoaded = pageModules.onLoaded;
exports.indexChange = pageModules.indexChange;
exports.saveEvent = pageModules.saveEvent;
