define([], function() {
	
	var Entity = function() {

		this.id;

		this.x = 0;
		this.y = 0;
		this.gridX = 0;
		this.gridY = 0;
		this.speed = 0;
		this.image = null;
		this.spriteRow = 0;
		this.animation = null;

		this.visible = 1;

		this.init = function(id, x, y, gridX, gridY, image, speed, spriteRow, animation) {

			this.id = id;
			this.x = x;
			this.y = y;
			this.gridX = gridX;
			this.gridY = gridY;
			this.image = image;
			this.speed = speed;
			this.spriteRow = spriteRow;
			this.animation = animation;
		};

		this.update = function() {
			// override it
		}

	};

	return Entity;
});