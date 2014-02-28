define(["animation"], function(Animation) {
	
	var Entity = function() {

		this.id;

		this.hp = 0;
		this.sp = 0;
		this.hpMax = 0;
		this.spMax = 0;
		this.hitTaken = 0;

		this.x = 0;
		this.y = 0;
		this.gridX = 0;
		this.gridY = 0;
		this.speed = 0;
		this.image = null;
		this.spriteRow = 0;
		this.animation = null;
		this.hitAnimation;

		this.visible = 1;

		this.init = function(id, hp, sp, hpMax, spMax, hitTaken, x, y, gridX, gridY, image, speed, spriteRow, animation) {

			this.id = id;
			this.x = x;
			this.y = y;
			this.gridX = gridX;
			this.gridY = gridY;
			this.image = image;
			this.speed = speed;
			this.spriteRow = spriteRow;
			this.animation = animation;
			this.hp = hp;
			this.hpMax = hpMax;
			this.sp = sp;
			this.spMax = spMax;
			this.hitTaken = hitTaken;
			this.hitAnimation = new Animation(20, 0, 50, 0);
		};

		this.update = function() {
			// override it
		}

	};

	return Entity;
});