
	var Entity = {

		init : function(id, type, hp, sp, hpMax, spMax, gridX, gridY, image, speed, spriteRow) {

			this.id = id;
			this.type = type;
			this.gridX = gridX;
			this.gridY = gridY;
			this.image = image;
			this.speed = speed;
			this.spriteRow = spriteRow;
			this.hp = hp;
			this.hpMax = hpMax;
			this.sp = sp;
			this.spMax = spMax;
		//	this.hitAnimation = new Animation(20, 0, 50, 0);
		}
	};

	module.exports = Entity;