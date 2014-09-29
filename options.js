var EventEmitter = require("events").EventEmitter;
var form = document.getElementById("voice_opts");
var random_buttom = form.querySelector(".random");
var serialize = require("form-serialize");
var populate = require("form-populate");
var randomvoice = require("randomvoice");

var events = new EventEmitter();
var option_key = "speakeasy:options:voice";

form.addEventListener("submit", handle_submit);
form.addEventListener("input", handle_submit);
reload_opts();

random_buttom.addEventListener("click", function(e) {
	e.preventDefault();
	randomize();
})

module.exports = events;
events.getOptions = get_opts;
events.reloadOptions = reload_opts;

function get_opts() {
	return serialize(form, {
		hash: true
	});
}

function handle_submit(e) {
	e.preventDefault();
	var opts = get_opts();
	save_opts(opts);
	events.emit("change", opts);
}

function reload_opts() {
	var saved_options = localStorage.getItem(option_key);
	if (!!saved_options) populate(form, JSON.parse(saved_options));
}

function randomize(seed) {
	var opts = randomvoice(seed);
	save_opts(opts);
	events.emit("change", opts);
	populate(form, opts);
}

function save_opts(opts) {
	localStorage.setItem(option_key, JSON.stringify(opts));
}
