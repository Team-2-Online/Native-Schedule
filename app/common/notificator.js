var LocalNotifications = require("nativescript-local-notifications");
var moment = require("moment");

function doScheduleNotification(params) {
    var itemDate = new Date(params.eventYear,
        params.eventMonth,
        params.eventDay,
        params.eventHour,
        params.eventMinutes);

    var mom = moment(itemDate);

    LocalNotifications.schedule([{
        id: 2,
        title: mom.format("HH:mm") + " - " + params.eventTitle.substr(0, 25),
        body: params.eventDescription.substr(0, 25),
        at: mom.subtract(5, 'm').toDate()
    }]).then(
        function () {
        },
        function (error) {
            console.log("doSchedule error: " + error);
        })
};

module.exports = {
  doScheduleNotification
};