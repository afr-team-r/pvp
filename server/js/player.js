var Entity = require("./entity.js");

/* Abstracao de jogador */
var Player = function(connection, game) {

	var self = this;

	/* Sua conexao e mundo em que esta */
	this.connection = connection;
	this.game = game;

	/* init da classe pai, Entity.
		Esses dados serao carregados posteriormente 
		de alguma base */
	this.init(connection.id, "warrior", 100,10, 100, 10, 0, 0, null, 100, 3);

	/* Implementa o callback da conexao para cada
	   dado enviado pelo cliente */
	this.connection.listen(function(message) {
		console.log("Data: " + message + " received from connection " + connection.id);
	});

	/* Implementa o callback para o fechamento
	    da conexao */
	this.connection.onClose(function() {
		self.connectionCloseCallback();
	});

	/* Callbacks */

	this.onConnectionClose = function(callback) {
		self.connectionCloseCallback = callback;
	};

};

Player.prototype = Entity;

module.exports = Player;