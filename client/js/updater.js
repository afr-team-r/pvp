define(["map"], function(Map) {


	var Updater = function(game) {

		var self = this;

		this.game = game;

		this.player = game.player;
		this.world = game.world;

		this.running = 1;

		this.start = function() {
			this.running = 1;
		}

		this.stop = function() {
			this.running = 0;
		}

		this.update = function() {

			this.game.forEachEntity(function(entity) {

				entity.update();

				if(entity.animation != null)

					entity.animation.animate();
					entity.hitAnimation.animate();
				
					self.game.addToEntityGrid(entity.gridX, entity.gridY, entity);
			});
		}


	};

return Updater;

});