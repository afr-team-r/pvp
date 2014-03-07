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
		this.entitiesGrid = [];

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
				if(self.world && self.world.ready && self.client) {

					self.client.sendWelcome();

					self.updater.start();
					self.renderer.start();

					/** Desenha o background somente uma vez **/
					self.renderer.drawMap(0);
					self.renderer.drawMap(1);

					clearInterval(wait);

					/** Inicia o loop de atualizacao **/
					self.update();					
				}
			}, 100);		
   	 	};

   	 	/**  SETUP **/

   	 	this.setup = function(background, entities, foreground) {

   	 		var wait = setInterval(function() {

   	 			/** Verifica se as propriedades e as imagens foram carregadas **/
   	 			if(Properties.ready && ImageLoader.ready) {

					self.width = entities.width;
					self.height = entities.height;	

					self.world = new Map(
					 [
						{"name": "FLOOR1", "context": background, "values":[]},
						{"name": "OBJECTS", "context": background, "values":[]},
						{"name": "TOP", "context": foreground, "values":[]},
						{"name": "COLISAO", "context": null, "values":[]}
					]); 

					self.world.init(Properties.get("jsonMap"));	

					self.player = new Player();	

					self.player.sendMove(function(dx, dy) {
						self.client.sendMove(dx, dy);
					});


					self.client = new Client("187.56.55.167", "5000");
					self.client.init();

					self.client.onWelcome(function(id, hp, sp, x, y) {	
						self.player.setWelcomeSettings(id, hp, sp, x, y);
						self.addEntity(self.player);
					});

					self.client.onMove(function(id, x, y, spriteRow) {	
						self.updateEntityMove(id, x, y, spriteRow);
						self.animateEntity(id);
					});

					self.client.onSpawn(function(id, x, y) {
						temp = new Player();
						temp.setWelcomeSettings(id, 0, 0, x, y);

						self.addEntity(temp);	
					});


					self.renderer = new Renderer();
					self.renderer.init(self, entities, foreground);

					self.updater = new Updater(self);

					document.onkeydown = self.keyDownEvent;

					$('#foreground').mousemove(self.mouseOverEvent);				

					clearInterval(wait);
				}
			}, 100);
   	 	}

   	 	/** UPDATE **/ 

   	 	this.update = function() {

			self.renderer.render(); 
			self.updater.update();

		//	window.setTimeout(self.update, 5);

			requestAnimFrame(self.update);  	
   	 	};	 	

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

   	 	this.addToEntityGrid = function(x, y, entity) {
   	 		if(entity instanceof Entity) {

   	 			index = y*self.world.width + x;

   	 			if(this.entitiesGrid[index] == null) {

   	 				self.removeFromEntityGrid(entity);

   	 				self.entitiesGrid[index] = entity;
   	 			}

   	 		}
   	 	};

   	 	this.removeFromEntityGrid = function(entity, callback) {
   	 		$.each(this.entitiesGrid, function(k, v) {
   	 			if(v == entity) 
   	 				delete self.entitiesGrid[k];
   	 			
   	 		});
   	 	};

   	 	this.isEntityGridOcupped = function(x, y) {

   	 		entity = self.entitiesGrid[y*self.world.width + x];

   	 		if(entity != null && entity instanceof Entity) {
   	 			return 1;
   	 		}

   	 		return 0;
   	 	};

   	 	/** EVENTOS DO TECLADO **/

   	 	this.keyDownEvent = function(e) {
  			
	  			switch(KEY_CODES[e.keyCode]) {
	  				case 'right': 
	  				case 'left':
	  				case 'up': 
	  				case 'down': 
	  					self.player.move(self.world, KEY_CODES[e.keyCode]);
	  				break;
	  			}
  		};	

  		this.mouseOverEvent = function(event) {
			var gamePos = $('#container').offset();

			$('#container').css('cursor','default');

			self.mouse.x = parseInt((event.pageX - gamePos.left) / Properties.get("tileSize"));
			self.mouse.y = parseInt((event.pageY - gamePos.top) / Properties.get("tileSize"));

			if(self.world.getColisaoValue(self.mouse.x, self.mouse.y)) {
				self.mouse.strokeStyle = "#CC0000";			
			} else if (self.isEntityGridOcupped(self.mouse.x, self.mouse.y)) {
				$('#container').css('cursor','pointer');
				self.mouse.strokeStyle = "#FFFF00";			
			} else {
				self.mouse.strokeStyle = "#66FF00";
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
	            window.setTimeout(callback, 1000 / 60);
	        }
	    );
	}();

	return Game;
});