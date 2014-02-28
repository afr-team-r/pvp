define(["jquery","game"], function($, Game) {

	var Client = new function() {

		var socket = null;

		this.init = function(url, game) {
			this.game = game;
			 socket = new WebSocket(url, "echo-protocol");

			socket.addEventListener("open", function(event) {
				alert("Conectado!");
			});

			socket.addEventListener("message", function(event) {
				var messagejson = JSON.parse(event.data);
				alert(JSON.stringify(messagejson));
			});

			socket.addEventListener("error", function(err) {	
			});

			socket.addEventListener("close", function(err) {
				alert("Connection lost. Please refresh!");
			});
		};

		this.send = function(msg) {
			socket.send(JSON.stringify(msg));
		}

	};

	return Client;
});