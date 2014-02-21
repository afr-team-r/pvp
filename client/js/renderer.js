define(["game", "properties"], function(Game, Properties) {

	var Renderer = function() {

		/** VARIAVEIS **/

		var self = this;

		this.resizeValue = 1;

		this.game = null;
		this.player = null;
		this.world = null;

		this.entities = null;       
        this.foreground = null;

        this.running = 0;

        /** Iniciando o renderer **/
        this.init = function(game, entities, foreground) {

        	this.game = game;
        	this.player = this.game.player;
        	this.world = this.game.world;

			this.entities = (entities && entities.getContext) ? entities.getContext("2d") : null;       

			this.start();
		}

		/** Startar a rendenizacao **/
		this.start = function() {
			this.running = 1;
		};

		/** Parar a rendenizacao **/
		this.stop = function() {
			this.running = 0;
		};

		/** O metodo que rendeniza de fato **/
		this.render = function() {

			if(this.running) {

				this.game.forEachEntity(function(entity) {
					self.clearEntity(entity);
					self.drawEntity(entity);
				});

				// Camada acima do personagem
				this.drawMap(2);
			}
		};

		this.drawResized = function(ctx,img,sx,sy,swidth,sheight,x,y,width,height) {
			ctx.drawImage(img,sx,sy,swidth,sheight,x*this.resizeValue,y*this.resizeValue,width*this.resizeValue,height*this.resizeValue);
		}

		this.drawEntity = function(entity) {
			this.drawResized(
					this.entities, 
					entity.image, 
					(entity.frameNum*Properties.get("tileSize")), 
					(entity.spriteRow*Properties.get("tileSize")), 
					Properties.get("tileSize"), 
					Properties.get("tileSize"), 
					entity.x, 
					entity.y, 
					Properties.get("tileSize"), 
					Properties.get("tileSize"));
		}

		this.clearEntity = function(entity) {
			this.entities.clearRect(
				entity.x-Properties.get("tileSize"),
				entity.y-Properties.get("tileSize"),
				Properties.get("tileSize")*3,
				Properties.get("tileSize")*3);
		}

		this.drawTile = function(ctx, tileNumber, row, col) {

			// Se nao for um tile nulo (vazio), desenha-o
				if(tileNumber >= 0) {
					var tileRow = (tileNumber / this.world.imageNumTiles) | 0;
					var tileCol = (tileNumber % this.world.imageNumTiles) | 0;

					this.drawResized(
						ctx, 
						this.world.tileset, 
						(tileCol * this.world.tileSize), 
						(tileRow * this.world.tileSize), 
						this.world.tileSize,
						this.world.tileSize, 
						(col*this.world.tileSize), 
						(row*this.world.tileSize),
						 this.world.tileSize, 
						 this.world.tileSize);
				}
		};

		/** Desenha efetivamente o mapa **/
		this.drawMap = function(layerId) {

				// Pega os valores dos tiles a serem desenhados por camada
				var layerValues = this.world.getLayer(layerId).values;

				// Pega o contexto do canvas em que a camada sera desenhada
				var ctx = this.world.getLayer(layerId).context.getContext("2d");

				// Roda por linha e coluna
				for(var r=0; r < this.world.height; r++) {
					for(var c=0; c < this.world.width; c++) {

						// Pega o tile correspondente no vetor
						var tile = layerValues[r * this.world.width + c] -1;

						this.drawTile(ctx, tile, r, c);
					}
				}
			}

	};

	return Renderer;

});