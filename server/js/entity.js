
	/* ARRUMAR ESSA MERDA DEPOIS */
	var Entity = {

		init : function(id, type, hp, sp, hpMax, spMax, x, y, image, speed, spriteRow) {

			this.id = id;
			this.type = type;
			this.x = x;
			this.y = y;
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