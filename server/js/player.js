var Player = function(connection, game) {

	this.connection = connection;
	this.game = game;

	this.connection.listen(function(message) {
		console.log("Data: " + message + " received from connection " + connection.id);
	});

};

module.exports = Player;