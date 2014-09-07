var EventEmitter = require("events").EventEmitter;
var form = document.getElementById("voice_opts");
var serialize = require("form-serialize");

var events = new EventEmitter();

form.addEventListener("submit", handle_submit);

module.exports = events;
events.getOptions = get_opts;

function get_opts() {
	return serialize(form, {
		hash: true
	});
}

function handle_submit(e) {
	e.preventDefault();
	var opts = get_opts();
	events.emit("change", opts);
}
