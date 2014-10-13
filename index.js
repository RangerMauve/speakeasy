var speech = require("mespeak");
var options = require("./options.js");
var connection = require("./connection.js");
var sounds = require("./sounds.js");
var tosay = document.getElementById("tosay");

var host = "ws://localhost:8080";

connection.on("message",say);
connection.connect(host);

tosay.addEventListener("submit", function(e) {
	e.preventDefault();
	var message= tosay.text.value;
	var voice =  options.getOptions();
	connection.say(message,voice);
});

speech.loadConfig(require("mespeak/src/mespeak_config.json"));
speech.loadVoice(require("mespeak/voices/en/en-us.json"));

options.on("change", function(data) {
	speech.stop();
	say("This is your new voice", data);
});

function say(message, opts) {
	console.log("Speaking", message,opts)
	opts.rawdata = true;
	var data = speech.speak(message, opts);
	sounds.play(data);
}
