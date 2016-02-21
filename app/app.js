global.__base = __dirname + '/';
var application = require("application");
var navigation = require("./common/navigation");
application.start({ moduleName: "main-page" });


// var application = require("application");
// application.mainEntry = "views/new_event/create-event";
// var tabViewModule = require("ui/tab-view");
// application.start();
