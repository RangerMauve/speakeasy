var speech = require("mespeak");
var options = require("./options.js");
var sounds = require("./sounds.js");
var tosay = document.getElementById("tosay");

var socket = io.connect("172.20.10.7:8080");

socket.on("speaking", function(data) {
	var opts = data.voice;
	var message = data.message;
})

tosay.addEventListener("submit", function(e) {
	e.preventDefault();
	var data = tosay.text.value;
	var opts = options.getOptions();
	say(data, opts);
	socket.emit("speak", {
		voice: opts,
		message: data
	})
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
