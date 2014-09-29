var context = require('audio-context');

module.exports.play = play;

function play(arraybuffer) {
	var source = context.createBufferSource();
	context.decodeAudioData(arraybuffer, function(buffer) {
		source.buffer = buffer
		source.connect(context.destination);
		source.start();
	});
}
