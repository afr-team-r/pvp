define(["game", "properties"], function(Game, Properties) {

	var Renderer = function() {

		/** VARIAVEIS **/

		this.resizeValue = 1;

		this.game = null;
		this.player = null;
		this.world = null;

		this.entity = null;       
        this.foreground = null;

        this.running = 0;

        /** Iniciando o renderer **/
        this.init = function(game, entity, foreground) {

        	this.game = game;
        	this.player = this.game.player;
        	this.world = this.game.world;

			this.entity = (entity && entity.getContext) ? entity.getContext("2d") : null;       

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

				this.cleanPlayer(this.entity);
				this.drawPlayer();

				// Camada acima do personagem
				this.drawMap(2);
			}
		};

		this.drawResized = function(ctx,img,sx,sy,swidth,sheight,x,y,width,height) {
			ctx.drawImage(img,sx,sy,swidth,sheight,x*this.resizeValue,y*this.resizeValue,width*this.resizeValue,height*this.resizeValue);
		}

		this.drawPlayer = function() {
			this.drawResized(
					this.entity, 
					this.player.playerImage, 
					(this.player.frameNum*Properties.get("tileSize")), 
					(this.player.spriteRow*Properties.get("tileSize")), 
					Properties.get("tileSize"), 
					Properties.get("tileSize"), 
					this.player.x, 
					this.player.y, 
					Properties.get("tileSize"), 
					Properties.get("tileSize"));
		}

		this.cleanPlayer = function(canvas) {
			canvas.clearRect(
				this.player.x-Properties.get("tileSize"),
				this.player.y-Properties.get("tileSize"),
				Properties.get("tileSize")*3,
				Properties.get("tileSize")*3);
		}

		/** Desenha efetivamente o mapa **/
		this.drawMap = function(layerId) {

				// Pega os valores dos tiles a serem desenhados por camada
				var layerValues = this.world.getLayer(layerId).values;

				// Pega o contexto do canvas em que a camada sera desenhada
				var ctx = this.world.getLayer(layerId).context.getContext("2d");

				// Roda por linha e coluna
				for(var r=0; r < this.world.rowTileCount; r++) {
					for(var c=0; c < this.world.colTileCount; c++) {

						// Pega o tile correspondente no vetor
						var tile = layerValues[r * this.world.colTileCount + c] -1;

						// Se nao for um tile nulo (vazio), desenha-o
						if(tile >= 0) {
							var tileRow = (tile / this.world.imageNumTiles) | 0;
							var tileCol = (tile % this.world.imageNumTiles) | 0;

							this.drawResized(
								ctx, 
								this.world.tileset, 
								(tileCol * this.world.tileSize), 
								(tileRow * this.world.tileSize), 
								this.world.tileSize,
								this.world.tileSize, 
								(c*this.world.tileSize), 
								(r*this.world.tileSize),
								 this.world.tileSize, 
								 this.world.tileSize);
						}
					}
				}

			}

	};

	return Renderer;

});