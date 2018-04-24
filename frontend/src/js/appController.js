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
		self.supportedFiles = ['audio/wav', 'audio/mpeg', 'audio/x-flac'];

		self.selectListener = function(event) {
			var files = event.detail.files;
			if (self.supportedFiles.indexOf(files[0].type) >= 0) {
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
						self.transcriptionProgress('Google transcription completed');
					})
					.catch(error => {
						self.transcriptionProgress('Google transcription failed.');
					});

				axios
					.post('https://rightful-blowgun.glitch.me/transcribe/amazon', data)
					.then(response => {
						self.amazonText(response.data.transcription);
						self.transcriptionProgress('Amazon transcription completed');
					})
					.catch(error => {
						self.transcriptionProgress('Amazon transcription failed.');
					});
			} else {
				alert('Please select a valid mono WAV/MP3/FLAC file.');
			}
		};
	}

	return new ControllerViewModel();
});
