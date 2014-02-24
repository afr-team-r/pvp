define(["jquery", "map","player","renderer", "properties", "imageLoader", "timer", "updater", "entity"], 
	function($, Map, Player, Renderer, Properties, ImageLoader, Timer, Updater, Entity) {

	var Game = function() {

		/**  SELF **/
		var self = this;

		/** VARIAVEIS **/

		this.player = null;
		this.world = null;
		this.renderer = null;	
		this.updater = null;

		this.entities = {};

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

					self.renderer = new Renderer();
					self.renderer.init(self, entities, foreground);

					self.updater = new Updater(self);

					document.onkeydown = self.keyDownEvent;

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