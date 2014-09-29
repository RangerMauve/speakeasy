var speech = require("mespeak");
var options = require("./options.js");

var voice = "en-us.json";
speech.loadConfig("mespeak_config.json");
speech.loadVoice(voice);

options.on("change", function(data) {
	speech.stop();
	say("This is your new voice", data);
});

function say(message,opts){
	speech.speak(message,opts);
}
