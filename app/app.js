// global.__base = __dirname + '/';
// var application = require("application");
// application.start({ moduleName: "views/new_event/create-event" });


var application = require("application");
application.mainEntry = "views/new_event/create-event";
var tabViewModule = require("ui/tab-view");
application.start();
