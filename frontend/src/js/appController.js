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
				self.amazonTranscriptionProgress('Transcription completed.');
			} else {
				self.amazonTranscriptionProgress('Transcription job in progress.');
			}
		};

		self.selectListener = function(event) {
			var files = event.detail.files;

			if (files[0].name.match(/\.wav$|\.flac$|\.mp3/g)) {
				self.filename(files[0].name);
				self.amazonTranscriptionProgress('Transcribing file..');
				self.googleTranscriptionProgress('Transcribing file..');
				self.amazonText('');
				self.googleText('');

				let extension = files[0].name.substring(
					files[0].name.lastIndexOf('.') + 1,
					files[0].name.length
				);
				console.log(extension);

				let data = new FormData();
				data.append('audio', files[0]);

				axios
					.post(
						`https://rightful-blowgun.glitch.me/transcribe/google/${extension}`,
						data
					)
					.then(response => {
						self.googleText(response.data.transcription);
						self.googleTranscriptionProgress('Transcription completed.');
					})
					.catch(error => {
						console.log(error);
						self.googleTranscriptionProgress('Transcription failed.');
					});

				axios
					.post(
						`https://rightful-blowgun.glitch.me/transcribe/amazon/${extension}`,
						data
					)
					.then(response => {
						self.amazonJobName = response.data.transcriptionJobName;
						self.amazonTranscriptionProgress('Transcription job started.');
					})
					.catch(error => {
						console.log(error);
						self.amazonTranscriptionProgress('Transcription failed.');
					});
			} else {
				alert('Please select a valid MP3/WAV/FLAC file.');
			}
		};
	}

	return new ControllerViewModel();
});
