var speech = require("mespeak/mespeak.full.js");

var voice = require("mespeak/voices/en/en-us.json");
speech.loadVoice(voice);

speech.speak("Hello World")
