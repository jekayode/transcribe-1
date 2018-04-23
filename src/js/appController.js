define([
	'ojs/ojcore',
	'knockout',
	'ojs/ojknockout',
	'ojs/ojfilepicker'
], function(oj, ko) {
	function ControllerViewModel() {
		var self = this;
		self.filename = ko.observable('No file selected');
		self.googleText = ko.observable('');
		self.amazonText = ko.observable('');
		self.transcriptionProgress = ko.observable('');
		self.supportedFiles = ['audio/wav', 'audio/mp3'];

		self.selectListener = function(event) {
			var files = event.detail.files;

			if (self.supportedFiles.indexOf(files[0].type) >= 0) {
				self.filename(files[0].name);
				self.transcriptionProgress('Transcribing file');

				var reader = new FileReader();
				reader.readAsDataURL(files[0]);
				reader.onload = function(result) {
					axios
						.post('https://rightful-blowgun.glitch.me/transcribe/google', {
							audio: result
						})
						.then(function(response) {
							self.googleText(response.data.transcription);
							self.transcriptionProgress('Transcription completed');
						});
				};
				reader.onerror = function(error) {
					alert('Error transcribing file: ', error);
				};
			} else {
				alert('Invalid file selected. Please select an MP3');
			}
		};
	}

	return new ControllerViewModel();
});
