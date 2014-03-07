Types = require("./types.js"),
Map = require("./map.js")
Entity = require("./entity.js"),
Types = require("./types.js"),
_ = require('underscore');

/* Abatracao que repesenta um mundo */
module.exports = Game = function() {

	var self = this;

	/* Se foi carregado e
		quantidade de jogadores */
	this.ready = false;
	this.numberPlayers = 0;

	// TODO
	this.broadcastQueue = {}; 

	/* apenas para colisoes, no momento */
	this.map = null;

	/* Estruturas para armazenar os jogadores
		e suas posicoes na tela */
	this.entities = {};
	this.entitiesGrid = null;

	/* Inicia e carrega o mundo */
	this.init = function() {

		this.map = new Map();
		this.map.init();

		wait = setInterval(function() {

			if(self.map.ready) {
				self.initEntitiesGrid();
				self.ready = true;

				clearInterval(wait);
			}
		}, 200);	

		/* Implementa o callback (chamado no main)
	 	para quando um player se conecta ao mundo */
	 	this.onPlayerConnect(function(player) {

		 	/* Implementa o callback de conexao fechada do player */
		 	player.onConnectionClose(function() {
		 		self.numberPlayers--;
		 		self.removeFromEntityGrid(player.x, player.y ,player);
		 		self.removeEntity(player);
		 	});

		 	/* Implementa o callback de broadcast */
		 	player.onBroadcast(function(msg, ignoreSelf) {

		 		playerId = ignoreSelf ? player.id : null;

		 		self.broadcast(msg, playerId);		 		
		 	});

		 	/* Acao no player ao entrar */

		 	self.numberPlayers++;	 	
		 	self.addToEntityGrid(player.x, player.y ,player);
		 	self.addEntity(player);

		 	self.sendGameSpawnList(player);

		 	player.sendSpawnMessage();
		 });

	};

	/* METODOS */

	this.sendGameSpawnList = function(player) {
		_.each(self.entities, function(entity) {
		 	if(entity.id != player.id)
		 		player.connection.send([Types.Messages.SPAWN, entity.id, entity.x, entity.y]);
		 });
	};

	this.broadcast = function(msg, ignoredPlayer) {

		 _.each(self.entities, function(entity) {
		 	if(entity.id != ignoredPlayer)
		 		entity.connection.send(msg);
		 });
	};

	this.addEntity = function(entity) {
		self.entities[entity.id] = entity;
	};

	this.removeEntity = function(entity) {
		delete self.entities[entity.id];
	};

	this.initEntitiesGrid = function() {

        this.entitiesGrid = [];
        for(var i=0; i < this.map.height; i += 1) {
            this.entitiesGrid[i] = [];
            for(var j=0; j < this.map.width; j += 1) {
                this.entitiesGrid[i][j] = {};
            }
        }
        console.log("EntitiesGrid initialized!");
    };

	this.addToEntityGrid = function(x, y, entity) {
   			self.entitiesGrid[y][x][entity.id] = entity;		
   	};

   	this.removeFromEntityGrid = function(x, y, entity) {
   	 		delete self.entitiesGrid[y][x][entity.id];
   	 };

   	 this.isReady = function() {
	 	return this.ready;
	 };

	 this.isValidPosition = function(x, y) {
	 	return self.map.isColision(x,y) == 0;
	 };

   	 /* Callbacks */

	this.onPlayerConnect = function(callback) {
        this.connect_callback = callback;
    };	
};