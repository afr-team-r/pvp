define(["imageLoader", "properties", "entity", "animation", "timer"], function(ImageLoader, Properties, Entity, Animation, Timer) {

	var Player = function() {

		/** VARIAVEIS **/

		this.dx = 0;
		this.dy = 0;	

		this.speed = 500;
		this.delay = 600-this.speed;

		this.walkDelay = new Timer(this.delay+100);
		this.smallStepTimer = new Timer(this.delay/8);

		this.smallStep = Properties.get("tileSize")/8;
	    this.smallStepCounter = 0;

		var directions = {
			"right" : {"dx" : 1, "dy" : 0, "spriteRow" : 2},
			"left" : {"dx" : -1, "dy" : 0, "spriteRow" : 0},
			"up" : {"dx" : 0, "dy" : -1, "spriteRow" : 1},
			"down" : {"dx" : 0, "dy" : 1, "spriteRow" : 3}
		};		    	    

		// (id, x, y, gridX, gridY, image, speed, spriteRow, animation)
	    this.init("player", 0, 0, 0, 0, ImageLoader.druid, 100, 3, new Animation(8, 0, this.delay/8, 0));
		

		this.move = function(world, direction) {

			if(!this.walkDelay.isOver(new Date().getTime()))
				return;			

			var colidiu = world.getColisaoValue(this.gridX+directions[direction].dx, this.gridY+directions[direction].dy);

			if(!colidiu) {
				this.dx = directions[direction].dx;
				this.dy = directions[direction].dy;

				this.spriteRow = directions[direction].spriteRow;
				this.animation.restartAnimation();				
			}  			
	     };

	     this.update = function(){

	     	if(!this.smallStepTimer.isOver(new Date().getTime()) || (this.dx == 0 && this.dy == 0))
	     		return;

	        this.x += this.dx * this.smallStep;
			this.y += this.dy * this.smallStep;

			if(++this.smallStepCounter == this.animation.numFrames) {

				this.gridX += this.dx;
				this.gridY += this.dy;

				this.smallStepCounter=0;
				this.dx = this.dy = 0; 
			}			
	     };
	};

	Player.prototype = new Entity();

return Player;

});