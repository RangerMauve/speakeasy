var EventEmitter = require("events").EventEmitter;
var websocket = require('websocket-stream');
var dnode = require("dnode");

var connection = new EventEmitter();
connection.connect = connect;
connection.say = say;
module.exports = connection;

function connect(host){
	var sock = websocket(host + "/speakeasy");
	var d = dnode({
		handle_speak:handle_remote_message.bind(this)
	})

	this._socket = sock;

	d.on("remote",bind_remote.bind(this));
	sock.pipe(d).pipe(sock);
}

function say(message, voice){
	var dnode = this._dnode;
	if(dnode)dnode.say({message:message,voice:voice})
}

function handle_remote_message(data){
	console.log("Got remote",data);
	this.emit("message",data.message,data.voice);
}

function bind_remote(socket){
	this._dnode = socket;
	this.emit("connected",this);
}
