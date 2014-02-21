define([], function() {
	
	var Entity = function() {

		this.id;

		this.x;
		this.y;
		this.gridX;
		this.gridY;
		this.speed;
		this.image = null;

		this.visible = 1;

		this.init = function(id, x, y, gridX, gridY, image, speed) {

			this.id = id;
			this.x = x;
			this.y = y;
			this.gridX = gridX;
			this.gridY = gridY;
			this.image = image;
			this.speed = speed;
		};

	};

	return Entity;
});