define(["map"], function(Map) {


	var Updater = function(game) {

		var self = this;

		this.game = game;

		this.player = game.player;
		this.world = game.world;

		this.running = false;

		this.start = function() {
			this.running = true;
		}

		this.stop = function() {
			this.running = false;
		}

		this.update = function() {

			if(this.running) {
				this.game.forEachEntity(function(entity) {

					entity.update();

					if(entity.animation != null)

						entity.animation.animate();
				});
			}
		}
	};

return Updater;

});