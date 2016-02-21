'use strict';

let observable = require("data/observable");
var navigation = require(__base + "common/navigation");

var pageViewModel = (function (_super) {
	__extends(pageViewModel, _super);

	function pageViewModel() {
		_super.call(this);
	};

	pageViewModel.prototype.navigateToAddEventPage = navigation.goToAddEvent;

	return pageViewModel;
})(observable.Observable);

exports.pageViewModel = new pageViewModel();
