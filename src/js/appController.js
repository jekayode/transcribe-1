define([
	'ojs/ojcore',
	'knockout',
	'ojs/ojknockout',
	'ojs/ojfilepicker'
], function(oj, ko) {
	function ControllerViewModel() {
		var self = this;
		self.filename = ko.observable('sample.mp3');

		self.selectListener = function(event) {
			var files = event.detail.files;
			for (var i = 0; i < files.length; i++) {
				self.fileNames.push(files[i].name);
			}
		};
	}

	return new ControllerViewModel();
});
