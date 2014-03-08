define(["jquery", "map","player","renderer", "properties", "imageLoader", "timer", "updater", "entity", "client"], 
	function($, Map, Player, Renderer, Properties, ImageLoader, Timer, Updater, Entity, Client) {

	var Game = function() {

		/**  SELF **/
		var self = this;

		/** VARIAVEIS **/

		this.width = 0;
		this.height = 0;

		this.player = null;
		this.world = null;
		this.renderer = null;	
		this.updater = null;
		this.client = null;

		this.entities = {};
		this.entitiesGrid = null;

		this.mouse = {x: 0, y: 0, strokeStyle: "#CC0000"};

		KEY_CODES = {
   			32: 'space',
			37: 'left',
			38: 'up',
  			39: 'right',
    		40: 'down',
  		};

		/** INIT DO JOGO **/

		this.init = function() {

			var wait = setInterval(function() {

				/** Verifica se o mapa foi carregado **/
				if(self.world && self.world.ready && self.client && self.client.isReady()) {

					clearInterval(wait);

					self.client.sendWelcome();

					self.updater.start();
					self.renderer.start();

					/** Desenha o background somente uma vez **/
					self.renderer.drawMap(0);
					self.renderer.drawMap(1);

					/** Inicia o loop de atualizacao **/
					self.update();					
				}
			}, 200);		
   	 	};

   	 	/**  SETUP **/

   	 	this.setup = function(background, entities, foreground) {

   	 		var wait = setInterval(function() {

   	 			/** Verifica se as propriedades e as imagens foram carregadas **/
   	 			if(Properties.ready && ImageLoader.ready) {

   	 				clearInterval(wait);

					self.width = entities.width;
					self.height = entities.height;	

					self.initEntitiesGrid();

					/** WORLD MAP **/
					self.world = new Map(
					 [
						{"name": "FLOOR1", "context": background, "values":[]},
						{"name": "OBJECTS", "context": background, "values":[]},
						{"name": "TOP", "context": foreground, "values":[]},
						{"name": "COLISAO", "context": null, "values":[]}
					]); 

					self.world.init(Properties.get("jsonMap"));	

					/** PLAYER **/
					self.player = new Player();	

					self.player.sendMove(function(dx, dy) {
						self.client.sendMove(dx, dy);
					});

					/** CLIENT **/
					self.client = new Client("192.168.2.40", "5000");
					self.client.init();

					self.client.onWelcome(function(id, hp, sp, x, y) {	

						self.player.setWelcomeSettings(id, hp, sp, x, y);

						self.addEntity(self.player);
						self.addToEntityGrid(self.player);
					});

					self.client.onMove(function(id, x, y, spriteRow) {	

						self.removeFromEntityGrid(self.entities[id]);

						self.updateEntityMove(id, x, y, spriteRow);

						self.addToEntityGrid(self.entities[id]);

						self.animateEntity(id);
					});

					self.client.onSpawn(function(id, x, y) {
						var temp = new Player();
						temp.setWelcomeSettings(id, 0, 0, x, y);

						self.addEntity(temp);	
						self.addToEntityGrid(temp);
					});

					/** RENDERER **/
					self.renderer = new Renderer();
					self.renderer.init(self, entities, foreground);

					/** UPDATER **/
					self.updater = new Updater(self);

					/** SCREEN EVENTS **/
					document.onkeydown = self.keyDownEvent;
					$('#foreground').mousemove(self.mouseOverEvent);					
				}
			}, 200);
   	 	}

   	 	/** UPDATE **/ 

   	 	this.update = function() {
			self.renderer.render(); 
			self.updater.update();

		//	window.setTimeout(self.update, 50);

			requestAnimFrame(self.update);  	
   	 	};	 

   	 	/* Methods */

   	 	this.animateEntity = function(id) {
   	 		if(this.entities[id]) {
   	 			this.entities[id].animate();
   	 		}
   	 	};	

   	 	this.addEntity = function(entity) {
   	 		if(entity instanceof Entity) 
   	 			this.entities[entity.id] = entity;			
   	 	};

   	 	this.updateEntityMove = function(id, x, y, spriteRow) {
   	 		if(this.entities[id]) {
   	 			this.entities[id].x = x;
   	 			this.entities[id].y = y;
   	 			this.entities[id].spriteRow = spriteRow;
   	 		}
   	 	};

   	 	this.forEachEntity = function(callback) {
   	 		$.each(self.entities, function(k, v) {
   	 			callback(v);
   	 		});
   	 	};

   	 	this.initEntitiesGrid = function() {

	        this.entitiesGrid = [];
	        for(var i=0; i < self.height; i += 1) {
	            this.entitiesGrid[i] = [];
	            for(var j=0; j < self.width; j += 1) {
	                this.entitiesGrid[i][j] = null;
	            }
	        }
        
    	};

   	 	this.addToEntityGrid = function(entity) {

   	 		if(entity instanceof Entity) {
   	 			self.entitiesGrid[entity.y][entity.x] = entity; 	 			
   	 		}
   	 	};

   	 	this.removeFromEntityGrid = function(entity) {
   	 			delete self.entitiesGrid[entity.y][entity.x];
   	 	};

   	 	this.isEntityGridOcupped = function(x, y) {
   	 		return self.entitiesGrid[y][x] != null;
   	 	};

   	 	 this.mouseOverEvent = function(event) {
			var gamePos = $('#container').offset();

			//$('#container').css('cursor','default');

			self.mouse.x = parseInt((event.pageX - gamePos.left) / Properties.get("tileSize"));
			self.mouse.y = parseInt((event.pageY - gamePos.top) / Properties.get("tileSize"));

			if(self.world.getColisaoValue(self.mouse.x, self.mouse.y)) {
				self.mouse.strokeStyle = "#CC0000";			
			} else if (self.isEntityGridOcupped(self.mouse.x, self.mouse.y)) {
				self.mouse.strokeStyle = "#FFFF00";			
			} else {
				self.mouse.strokeStyle = "#66FF00";
			}
		};

   	 	/** EVENTOS DO TECLADO **/

   	 	this.keyDownEvent = function(e) {
  			
	  			switch(KEY_CODES[e.keyCode]) {
	  				case 'right': 
	  				case 'left':
	  				case 'up': 
	  				case 'down': 
	  					self.player.move(KEY_CODES[e.keyCode]);
	  				break;
	  			}
  		};	

	};

	/*************** ANIMATION FRAME ****************/

	window.requestAnimFrame = function(){
	    return (
	        window.requestAnimationFrame       || 
	        window.webkitRequestAnimationFrame || 
	        window.mozRequestAnimationFrame    || 
	        window.oRequestAnimationFrame      || 
	        window.msRequestAnimationFrame     || 
	        function(/* function */ callback){
	            window.setTimeout(callback, 1000 / 20);
	        }
	    );
	}();

	return Game;
});