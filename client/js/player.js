define(["imageLoader", "properties", "entity"], function(ImageLoader, Properties, Entity) {

	var Player = function() {

		/** VARIAVEIS **/

		this.init("player", 0, 0, 0, 0, ImageLoader.druid, 100);

		this.dx = 0;
		this.dy = 0;		

		/** Animation **/
	    this.frameNum = 0;
	    this.spriteRow = 3;	    
		
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