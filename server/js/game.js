Types = require("./types.js"),
Map = require("./map.js")
Entity = require("./entity.js"),
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

		 	self.numberPlayers++;	 	
		 	self.addToEntityGrid(player.gridX, player.gridY ,player);
		 	self.addEntity(player);

		 	/* Implementa o callback de conexao fechada do player */
		 	player.onConnectionClose(function() {
		 		self.numberPlayers--;
		 		self.removeFromEntityGrid(player.gridX, player.gridY ,player);
		 		self.removeEntity(player);
		 	});

		 	/* Implementa o callback de broadcast */
		 	player.onBroadcast(function(msg) {
		 		_.each(self.entities, function(entity) {
		 			entity.connection.send(msg);
		 		});
		 	});

		 });

	};

	/* METODOS */

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

   	 /* Callbacks */

	this.onPlayerConnect = function(callback) {
        this.connect_callback = callback;
    };	
};