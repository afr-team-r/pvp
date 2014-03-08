define(["animation"], function(Animation) {
	
	var Entity = function() {

		this.id;
		this.type;
		this.hp = 0;
		this.sp = 0;
		this.hpMax = 0;
		this.spMax = 0;
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.image = null;
		this.spriteRow = 0;
		this.animation = null;

		this.init = function(id, type, hp, sp, hpMax, spMax, x, y, speed, image, spriteRow, animation) {

			this.id = id;
			this.type = type;
			this.hp = hp;
			this.sp = sp;
			this.hpMax = hpMax;
			this.spMax = spMax;
			this.x = x;
			this.y = y;			
			this.speed = speed;
			this.image = image;
			this.spriteRow = spriteRow;
			this.animation = animation;
		};

		this.update = function() {
			// override it
		}

	};


	return Entity;
});