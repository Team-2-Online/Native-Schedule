'use strict';

let observable = require("data/observable");
var observableArray = require("data/observable-array");
var navigation = require(__base + "common/navigation");
var eventsService = require(__base + "services/events-service");
var moment = require("moment");

var pageViewModel = (function (_super) {
	__extends(pageViewModel, _super);
    
    var currentDate = new Date(); 

	function pageViewModel() {
		_super.call(this);
	};

	function allEvents(){
	    var resultDb = eventsService.all();       

		var result =  new observableArray.ObservableArray(resultDb);
		// console.log(JSON.stringify(resultDb, null, 4));
		return result;
	}
    
    function eventsToday(){
	    var resultDb = eventsService.byDate(
            currentDate.getDate(), 
            currentDate.getMonth(), 
            currentDate.getFullYear());
            
        var events = new observableArray.ObservableArray(resultDb)
            
        var result = {
                date: moment(currentDate).format('DD MMMM YYYY'),
                events: events
            } 
                
		return result;
    }
       
    function eventsTomorrow(){
        var tomorrow = new Date();
        tomorrow.setDate(currentDate.getDate() + 1);
        
        var resultDb = eventsService.byDate(
            tomorrow.getDate(), 
            tomorrow.getMonth(), 
            tomorrow.getFullYear());
            
         var events = new observableArray.ObservableArray(resultDb)
            
        var result = {
                date: moment(tomorrow).format('DD MMMM YYYY'),
                events: events
            }  
      
        return result;
    }
    
     function eventsNexWeek(){
        // var lastDay = new Date();
        // lastDay.setDate(currentDate.getDate() + 7);
        
        var resultDb = eventsService.byRange(
            currentDate.getDate(), 
            currentDate.getMonth(), 
            currentDate.getFullYear(),
            7);
            
        var result =  new observableArray.ObservableArray(resultDb);
        return result;
    }

	pageViewModel.prototype.navigateToAddEventPage = navigation.goToAddEvent;
	pageViewModel.prototype.allEvents = allEvents;    
    pageViewModel.prototype.eventsToday = eventsToday;
    pageViewModel.prototype.eventsTomorrow = eventsTomorrow;
    pageViewModel.prototype.eventsNexWeek = eventsNexWeek;

	return pageViewModel;
})(observable.Observable);

exports.pageViewModel = new pageViewModel();
