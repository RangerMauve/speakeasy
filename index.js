var speech = require("mespeak");
var options = require("./options.js");
var sounds = require("./sounds.js");
var tosay = document.getElementById("tosay");

var socket = io.connect("https://still-fjord-1172.herokuapp.com");

socket.on("speaking", function(data) {
	console.log("Someone is speaking", data);
	var opts = data.voice;
	var message = data.message;
	say(message, opts);
})

tosay.addEventListener("submit", function(e) {
	e.preventDefault();
	var data = {
		message: tosay.text.value,
		voice: options.getOptions()
	};
	say(data.message, data.voice);;
	console.log("We are speaking", data);
	socket.emit("speak", data);
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
