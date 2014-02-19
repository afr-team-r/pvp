define(["map","player","renderer", "properties", "imageLoader"], function(Map, Player, Renderer, Properties, ImageLoader) {


	var Game = function() {

		/**  SELF **/
		var self = this;

		/** VARIAVEIS **/

		this.player = null;
		this.world = null;
		this.renderer = null;	

		this.background = null;
		this.entity = null;
		this.foreground = null;

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
				if(self.world.ready) {

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

   	 	this.setup = function(background, entity, foreground) {

   	 		var wait = setInterval(function() {

   	 			/** Verifica se as propriedades e as imagens foram carregadas **/
   	 			if(Properties.ready && ImageLoader.ready) {

		   	 		self.background = background;
					self.entity = entity;
					self.foreground = foreground;

					self.world = new Map(
					 [
						{"name": "FLOOR1", "context": background, "values":[]},
						{"name": "OBJECTS", "context": background, "values":[]},
						{"name": "TOP", "context": foreground, "values":[]},
						{"name": "COLISAO", "context": null, "values":[]}
					]); 

					self.world.init(Properties.get("jsonMap"));

					self.player = new Player();

					self.renderer = new Renderer();
					self.renderer.init(self, entity, foreground);

					document.onkeydown = self.keyDownEvent;

					clearInterval(wait);
				}
			}, 100);
   	 	}

   	 	/** UPDATE **/ 

   	 	this.update = function() {

   	 		// UPDATER //
			self.player.move(self.world); 
			// UPDATER //
			
			self.renderer.render();

   	 		requestAnimFrame(self.update);
   	 	};	 		

   	 	/** EVENTOS DO TECLADO **/

   	 	this.keyDownEvent = function(e) {
  			
	  			switch(KEY_CODES[e.keyCode]) {
	  				case 'right': 
	  					self.player.dx=1; 
	  					self.player.spriteRow = 2;
	  				break;

	  				case 'left':
	  					self.player.dx=-1; 
	  					self.player.spriteRow = 0;
	  				break;

	  				case 'up': 
	  					self.player.dy=-1; 
	  					self.player.spriteRow = 1;
	  				break;

	  				case 'down': 
	  					self.player.dy=1; 
	  					self.player.spriteRow = 3;

	  				break;
	  			}
  		};		



   	 	window.requestAnimFrame = (function(){
  			return  window.requestAnimationFrame 	||
          	window.webkitRequestAnimationFrame 		||
          	window.mozRequestAnimationFrame    		||
          	function( callback ){
            	//window.setTimeout(callback, 1000000 );
         	 };
		})();



	};

	return Game;
});