var speech = require("mespeak");
var options = require("./options.js");

var voice = require("mespeak/voices/en/en-us.json");
speech.loadVoice(voice);

options.on("change", function(data) {
	speech.speak("Welcome", data);
});
