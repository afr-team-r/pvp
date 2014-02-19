define(["imageLoader", "properties"], function(ImageLoader, Properties) {

	var Player = function() {

		/** VARIAVEIS **/
		this.x = 0;
		this.y = 0;

		this.posx = 0;
		this.posy = 0;

		this.dx = 0;
		this.dy = 0;

		this.speed = 100;
		this.playerImage = ImageLoader.druid;

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

			var colidiu = world.getColisaoValue(this.posx+this.dx, this.posy+this.dy);

			if(!colidiu) {
				this.x += this.dx * Properties.get("tileSize");
				this.y += this.dy * Properties.get("tileSize");
			     	
			 	this.posx += this.dx;
				this.posy += this.dy;
			}  

			this.dx = this.dy = 0;
	     }

	};

return Player;

});