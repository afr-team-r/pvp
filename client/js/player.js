define(["imageLoader", "properties", "entity", "animation", "timer", "client"], function(ImageLoader, Properties, Entity, Animation, Timer, Client) {

	var Player = function() {

		/** VARIAVEIS **/

		// Quantos frames de animacao possui o personagem
		this.animationFrames = 9;

		// Ao apertar setas direcionais
		this.dx = 0;
		this.dy = 0;	

		// Delay na animacao e movimentacao
		// Divido pelo numero de frames
		this.stepDelay = 20;
		this.animationDelay = this.stepDelay;

		//  Timer de movimentacao
		this.smallStepTimer = new Timer(this.stepDelay);
		this.isMoving = 0;

		// Distancia de movimentacao por quadro
		// Eh dividido o tamanho do tile pelo numero de frames
		// Assim, quando a animacao acabar, o usuario tera movido
		// um SQM exatamente, junto com o termino da animacao
		this.smallStep = Properties.get("tileSize")/this.animationFrames;

		// Contador de passos
	    this.smallStepCounter = 0;

		var directions = {
			"right" : {"dx" : 1, "dy" : 0, "spriteRow" : 2},
			"left" : {"dx" : -1, "dy" : 0, "spriteRow" : 0},
			"up" : {"dx" : 0, "dy" : -1, "spriteRow" : 1},
			"down" : {"dx" : 0, "dy" : 1, "spriteRow" : 3}
		};		    	    

		// (id, type, hp,  hpMax, sp, spMax, hitTaken, x, y, gridX, gridY, image, speed, spriteRow, animation)
	    this.init(0, "player", 0, 0, 0, 0, 0,  0, 0, 
	    	ImageLoader.druid, 100, 3, new Animation(this.animationFrames, 0, this.animationDelay, 0));

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
		this.move = function(world, direction) {

				this.move_callback(direction);


			/*if(!this.isMoving) {

				// Retorna diferente de 0 se colidiu
				var colidiu = world.getColisaoValue(
					this.x + directions[direction].dx, 
					this.y + directions[direction].dy
				);

				if(!colidiu) {
					// Computa o passo dado com sucesso
					this.dx = directions[direction].dx;
					this.dy = directions[direction].dy;

					this.move_callback(this.dx, this.dy);

					// Atualiza a linha de animacao				
					this.spriteRow = directions[direction].spriteRow;

					this.isMoving = 1;		
				} else {
					this.setHP(this.hp-12);
					this.hitTaken = 12;
					this.hitAnimation.restartAnimation();
				}
			}		*/
	     };

	     // Funcao padrao de todas as Entity
	     this.update = function() {

			//	this.isMoving = 0;

	     	// Se ja passou o delay do passo, e devemos mover o jogador
	     	// Caso nao, sai
	     /*	if(!this.smallStepTimer.isOver(new Date().getTime()) || !this.isMoving)
	     		return;

	     	// Move o jogador um pouco por frame
	        this.x += this.dx * this.smallStep;
			this.y += this.dy * this.smallStep;

			// Se acabou a animacao, entao movemos tudo
			if(++this.smallStepCounter ==this.animation.numFrames) {

				this.gridX += this.dx;
				this.gridY += this.dy;

				this.smallStepCounter=0;
				this.dx = this.dy = 0; 

				this.isMoving = 0;
			}	 */

	     };
	};

	Player.prototype = new Entity();

return Player;

});