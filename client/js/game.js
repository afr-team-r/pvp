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
				if(self.world && self.world.ready) {

					/** Desenha o background somente uma vez **/
					self.renderer.drawMap(0);
					self.renderer.drawMap(1);

					/** Inicia o loop de atualizacao **/
					self.update();

					clearInterval(wait);
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
					self.addEntity(self.player);

					self.client = new Client("localhost", "5000");
					self.client.init();

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

   	 	this.addEntity = function(entity) {
   	 		if(entity instanceof Entity) {
   	 			if(this.entities[entity.id] == undefined) {
   	 				this.entities[entity.id] = entity;
   	 			}
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
	  					self.client.sendWelcome();
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