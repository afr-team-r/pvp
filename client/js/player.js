define(["imageLoader", "properties", "entity", "animation"], function(ImageLoader, Properties, Entity, Animation) {

	var Player = function() {

		/** VARIAVEIS **/

		this.dx = 0;
		this.dy = 0;			    	    

	    this.init("player", 0, 0, 0, 0, ImageLoader.druid, 100, 3, new Animation(8, 0, 500, 0));
		
		// Setta o dx
		this.setDx = function(dx) {
			this.dx = dx;
		}

		// Setta o dy
		this.setDy = function(dy) {
			this.dy = dy;
		}

		/** Funcao cuida do movimento do personagem **/
		this.move = function(world) {

			var colidiu = world.getColisaoValue(this.gridX+this.dx, this.gridY+this.dy);

			if(!colidiu) {
				this.x += this.dx * Properties.get("tileSize");
				this.y += this.dy * Properties.get("tileSize");
			     	
			 	this.gridX += this.dx;
				this.gridY += this.dy;
			}  

			this.dx = this.dy = 0;
	     }

	};

Player.prototype = new Entity();

return Player;

});