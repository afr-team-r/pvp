define(["imageLoader", "properties", "entity", "animation", "timer", "client"], function(ImageLoader, Properties, Entity, Animation, Timer, Client) {

	var Player = function() {

		/** VARIAVEIS **/

		// Quantos frames de animacao possui o personagem
		this.animationFrames = 9;
		this.animationDelay = 20;	    	    

	    this.init(0, "player", 0, 0, 0, 0, 0, 0, 100, ImageLoader.druid, 3, new Animation(this.animationFrames, 0, this.animationDelay, 0));

	    this.setWelcomeSettings = function(id, hp, sp, x, y) {
	    	this.id = id;
	    	this.hp = hp;
	    	this.hpMax = hp;
	    	this.sp = sp;
	    	this.spMax = sp;
	    	this.x = x;
	    	this.y = y;
	    };
		
	    this.getHPPercent = function() {
	    	return (this.hp / this.hpMax) * 100;
	    }

	    this.getSPPercent = function() {
	    	return (this.sp / this.spMax) * 100;
	    }

	    this.setHP = function(hp) {
	    	this.hp = hp > 0 ? hp : 0;
	    }

	     this.setSP = function(sp) {
	    	this.sp = sp > 0 ? sp : 0;
	    }

	    this.animate = function() {
	    	// Executa um loop de animacao
			this.animation.restartAnimation();	
	    };

	    /* Callbakcs */

	    this.sendMove = function(callback) {
	    	this.move_callback = callback;
	    };

	    // Evento ao apertas as setas do teclado
		this.move = function(direction) {
				this.move_callback(direction);	     
		};
	};

	Player.prototype = new Entity();

return Player;

});