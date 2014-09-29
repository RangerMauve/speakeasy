var speech = require("mespeak");
var options = require("./options.js");
var sounds = require("./sounds.js");

speech.loadConfig(require("mespeak/src/mespeak_config.json"));
speech.loadVoice(require("mespeak/voices/en-us.json"));

options.on("change", function(data) {
	speech.stop();
	say("This is your new voice", data);
});

function say(message,opts){
	opts.rawdata = true;
	var data = speech.speak(message,opts);
	sounds.play(data);
}
