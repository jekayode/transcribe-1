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
		self.googleTranscriptionProgress = ko.observable('');
		self.amazonTranscriptionProgress = ko.observable('');
		self.supportedFiles = [
			'audio/wav',
			'audio/mpeg',
			'audio/x-flac',
			'audio/flac'
		];

		self.selectListener = function(event) {
			var files = event.detail.files;

			self.filename(files[0].name);
			self.transcriptionProgress('Transcribing file');
			self.amazonText('');
			self.googleText('');

			let data = new FormData();
			data.append('audio', files[0]);

			axios
				.post('https://rightful-blowgun.glitch.me/transcribe/google', data)
				.then(response => {
					self.googleText(response.data.transcription);
					self.googleTranscriptionProgress('Google transcription completed.');
				})
				.catch(error => {
					self.googleTranscriptionProgress('Google transcription failed.');
				});

			axios
				.post('https://rightful-blowgun.glitch.me/transcribe/amazon', data)
				.then(response => {
					self.amazonText(response.data.transcription);
					self.amazonTranscriptionProgress('Amazon transcription completed.');
				})
				.catch(error => {
					self.amazonTranscriptionProgress('Amazon transcription failed.');
				});
		};
	}

	return new ControllerViewModel();
});
