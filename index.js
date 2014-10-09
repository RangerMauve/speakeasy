var speech = require("mespeak");
var options = require("./options.js");
var sounds = require("./sounds.js");
var tosay = document.getElementById("tosay");

// TODO: Listen for remote voices

tosay.addEventListener("submit", function(e) {
	e.preventDefault();
	var data = {
		message: tosay.text.value,
		voice: options.getOptions()
	};
	say(data.message, data.voice);;
	console.log("We are speaking", data);
	// TODO: Send out voice
});

speech.loadConfig(require("mespeak/src/mespeak_config.json"));
speech.loadVoice(require("mespeak/voices/en/en-us.json"));

options.on("change", function(data) {
	speech.stop();
	say("This is your new voice", data);
});

function say(message, opts) {
	opts.rawdata = true;
	var data = speech.speak(message, opts);
	sounds.play(data);
}
