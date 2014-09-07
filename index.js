var speech = require("mespeak");
var options = require("./options.js");
console.log(speech);
var voice = "en-us.json";
speech.loadConfig("mespeak_config.json");
speech.loadVoice(voice);

options.on("change", function(data) {
	speech.speak("Welcome", data);
});
