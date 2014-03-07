var Entity = require("./entity.js")
	Types = require("./types.js");

/* Abstracao de jogador */
var Player = function(connection, game) {

	var self = this;

	/* Sua conexao e mundo em que esta */
	this.connection = connection;
	this.game = game;

	var directions = {
			"right" : {"dx" : 1, "dy" : 0, "spriteRow" : 2},
			"left" : {"dx" : -1, "dy" : 0, "spriteRow" : 0},
			"up" : {"dx" : 0, "dy" : -1, "spriteRow" : 1},
			"down" : {"dx" : 0, "dy" : 1, "spriteRow" : 3}
		};		    	

	/* init da classe pai, Entity.
		Esses dados serao carregados posteriormente 
		de alguma base */

	// id, type, hp, sp, hpMax, spMax, x, y, image, speed, spriteRow
	this.init(connection.id, "warrior", 100, 10, 100, 10, 0, 0, null, 100, 3);

	this.send = function(msg) {
		this.connection.send(msg);
	};

	this.broadcast = function(msg, ignoreSelf) {
		if(this.broadcast_callback)
			this.broadcast_callback(msg, ignoreSelf);
	};

	this.updateCoordinates = function(dx, dy) {
		self.x += dx;
		self.y += dy;
	};

	this.sendSpawnMessage = function() {
		self.broadcast([Types.Messages.SPAWN, self.id, self.x, self.y], true);	
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

	this.onBroadcast = function(callback) {
		this.broadcast_callback = callback;
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
				self.send([Types.Messages.WELCOME, self.id, self.hp, self.sp, self.x, self.y]);
			break;

			case Types.Messages.MOVE:

				var direction = message[1];

				dx = directions[direction].dx;
				dy = directions[direction].dy;

				if(self.game.isValidPosition(self.x + dx, self.y + dy)) {

					self.spriteRow = directions[direction].spriteRow;

					self.updateCoordinates(dx, dy);
					self.broadcast([Types.Messages.MOVE, self.id, self.x, self.y, self.spriteRow], false);
				}

			break;
		}
		
	});

};

Player.prototype = Entity;

module.exports = Player;