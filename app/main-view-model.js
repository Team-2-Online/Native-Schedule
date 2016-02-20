'use strict'
let observable = require("data/observable");
let frameModule = require('ui/frame');

var HomePageModel = (function (_super) {
    __extends(HomePageModel, _super);
    function HomePageModel() {
        _super.call(this);
        this.counter = 42;
        this.set("message", this.counter + " taps left");
    }
    HomePageModel.prototype.tapAction = function () {
        this.counter--;
        if (this.counter <= 0) {
            this.set("message", "Hoorraaay! You unlocked the NativeScript clicker achievement!");
        }
        else {
            this.set("message", this.counter + " taps left");
        }
    };
    
    HomePageModel.prototype.navigateToNotesPage = function(args) {
        var navigationEntry = {
				moduleName: "./notes/notes-page",
				backstackVisible: true,
                animated: true,
                navigationTransition: {
                    transition: "curl"
                },
			};

			frameModule.topmost().navigate(navigationEntry);
    };
    return HomePageModel;
})(observable.Observable);
exports.HomePageModel = HomePageModel;
exports.mainViewModel = new HomePageModel();
