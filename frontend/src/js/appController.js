define([
	'ojs/ojcore',
	'knockout',
	'ojs/ojknockout',
	'ojs/ojfilepicker'
], function(oj, ko) {
	function ControllerViewModel() {
		var self = this;
		self.amazonJobName = '';
		self.filename = ko.observable('No file selected');
		self.googleText = ko.observable('');
		self.amazonText = ko.observable('');
		self.transcriptionProgress = ko.observable('');
		self.googleTranscriptionProgress = ko.observable('');
		self.amazonTranscriptionProgress = ko.observable('');
		self.supportedFiles = [
			'audio/wav',
			'audio/mpeg',
			'audio/x-flac',
			'audio/flac'
		];

		self.checkAmazonStatus = async function() {
			console.log(self.amazonJobName);
			let response = await axios.get(
				`https://rightful-blowgun.glitch.me/transcribe/amazon/status/${
					self.amazonJobName
				}`
			);

			if (response.data.status === 'completed') {
				self.amazonText(response.data.transcription);
				self.amazonTranscriptionProgress('Amazon transcription completed.');
			} else {
				self.amazonTranscriptionProgress(
					'Please wait. Transcription job not yet completed.'
				);
			}
		};

		self.selectListener = function(event) {
			var files = event.detail.files;

			self.filename(files[0].name);
			self.amazonTranscriptionProgress('Transcribing file');
			self.googleTranscriptionProgress('');
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
					console.log(error);
					self.googleTranscriptionProgress('Google transcription failed.');
				});

			axios
				.post('https://rightful-blowgun.glitch.me/transcribe/amazon', data)
				.then(response => {
					self.amazonJobName = response.data.transcriptionJobName;
					self.amazonTranscriptionProgress('Amazon transcription job started.');
				})
				.catch(error => {
					console.log(error);
					self.amazonTranscriptionProgress('Amazon transcription failed.');
				});
		};
	}

	return new ControllerViewModel();
});
