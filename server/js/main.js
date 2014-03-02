var Server = require("./ws.js"),
	Game = require("./game.js"),
	Player = require("./player.js");

function main() {

	var server = new Server(5000),
		game = new Game();

	server.onConnect(function(connection) {
		if(game)
			game.connect_callback(new Player(connection, game));
	});
};

main();