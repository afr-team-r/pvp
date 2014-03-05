var Entity = require("./entity.js")
	Types = require("./types.js");

/* Abstracao de jogador */
var Player = function(connection, game) {

	var self = this;

	/* Sua conexao e mundo em que esta */
	this.connection = connection;
	this.game = game;

	/* init da classe pai, Entity.
		Esses dados serao carregados posteriormente 
		de alguma base */

	// id, type, hp, sp, hpMax, spMax, gridX, gridY, image, speed, spriteRow
	this.init(connection.id, "warrior", 100,10, 100, 10, 0, 0, null, 100, 3);

	this.send = function(msg) {
		self.connection.connection.send(JSON.stringify(msg));
	};

	/* Implementa o callback para o fechamento
	    da conexao */
	this.connection.onClose(function() {
		self.connectionCloseCallback();
	});

	/* Callbacks */

	this.onConnectionClose = function(callback) {
		self.connectionCloseCallback = callback;
	};

		/* Implementa o callback da conexao para cada
	   dado enviado pelo cliente */
	this.connection.listen(function(message) {

		console.log("Data: " + JSON.stringify(message) + " received from player " + connection.id);

		action = message[0];

		if(action == null || action == undefined)
			return;

		switch(action) {
			case Types.Messages.WELCOME: 
				self.send([Types.Messages.WELCOME, self.hp, self.sp, self.gridX, self.gridX]);
			break;
		}
		
	});

};

Player.prototype = Entity;

module.exports = Player;