global.__base = __dirname + '/';
var application = require("application");
var liteDb = require("./common/SQLiteDatabase");
var navigation = require("./common/navigation");
var eventsModel = require("./data-models/event");
var noteModel = require("./data-models/note");

application.start({ moduleName: "main-page" });


// var application = require("application");
// application.mainEntry = "views/new_event/create-event";
// var tabViewModule = require("ui/tab-view");
// application.start();


liteDb.createTable(eventsModel);
liteDb.createTable(noteModel);
